import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
// import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    async hashPassword(password: string): Promise<string> {
        console.log('this was the password ', password)
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<CreateUserDto> ): Promise<UserDetails | any>{
        const {name, email, password} = user;
        const existingUser = await this.userService.findByEmail(email);
        if(existingUser) return 'There already is a user with this email!';
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;
        if(!doesUserExist) return null;
        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);
        if(!doesPasswordMatch) return null;
        return this.userService._getUserDetails(user);
    }


    async login(existingUser: AuthUserDto): Promise<{token: string, user: UserDetails} | null> {
        console.log('service triggered')
        const {email, password} = existingUser;
        const user = await this.validateUser(email, password);
        console.log('service gets user', user)
        if(!user) return null;
        const jwt = await this.jwtService.signAsync({user});
        console.log(existingUser)
        return {token: jwt, user: user};
    }

    
}
