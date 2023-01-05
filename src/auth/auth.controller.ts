import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { UserDetails } from 'src/user/user-details.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: CreateUserDto): Promise<UserDetails | null> {
        console.log('user in controller: ', user)
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: AuthUserDto): Promise<{token: string} | null> {
        console.log('user in controller: ', user)
        return this.authService.login(user);
    }
}
