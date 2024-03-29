import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UpdateUserDto } from './dto/update-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || null,
      completedLessons: user.completedLessons || [],
    };
  }

  //get user id from jwt token in request headers
  async findByToken(token: string): Promise<UserDetails | null> {
    // const cookie = request.headers.authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    console.log('jwt service return: ', data);
    return this.findById(data.user['id']);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });
    return newUser.save();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return user;
  }

  async addCompletedLesson(
    id: string,
    lessonNum: number,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    user.completedLessons.push(lessonNum);
    user.save();
    return user;
  }
}
