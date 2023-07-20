import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { Request } from 'express';
import locales from 'src/locales';
// import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(
    user: Readonly<CreateUserDto>,
    locale: string,
  ): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) return locales[locale]['auth.userExists'];
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
    locale: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;
    // console.log(user);
    if (!doesUserExist)
      throw new NotAcceptableException(locales[locale]['auth.userNotFound']);
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;
    return this.userService._getUserDetails(user);
  }

  //   async login(
  //     existingUser: AuthUserDto,
  //     locale: string,
  //   ): Promise<{ token: string; user: UserDetails } | null> {
  //     const { email, password } = existingUser;
  //     const user = await this.validateUser(email, password, locale);
  //     if (!user)
  //       throw new NotAcceptableException(locales[locale]['auth.wrongPassword']);
  //     const jwt = await this.jwtService.signAsync({ user });
  //     return { token: jwt, user: user };
  //   }
  async login(
    existingUser: AuthUserDto,
    locale: string,
  ): Promise<{ token: string }> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password, locale);
    if (!user)
      throw new NotAcceptableException(locales[locale]['auth.wrongPassword']);
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
