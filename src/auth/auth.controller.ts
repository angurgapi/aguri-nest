import { Body, Controller, HttpCode, HttpStatus, Post, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { UserDetails } from 'src/user/user-details.interface';
import {JwtGuard} from './guards/jwt.guard'
import {Request, Response} from 'express';
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('register')
    register(@Body() user: CreateUserDto): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    // @HttpCode(HttpStatus.OK)
    login(@Body() user: AuthUserDto): Promise<{token: string} | null> {
        const userData = this.authService.login(user);
        if(!userData) {
            throw new UnauthorizedException
        }
        return userData
    }

    //return user data from a profile request
    @UseGuards(JwtGuard)
    @Get('profile')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);
        const userProfileData = this.userService.findById(id)
        return {user: userProfileData};
    }
}
