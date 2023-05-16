import { Controller, Body, Get, Param, Put, Res, HttpStatus, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import {UpdateUserDto} from './dto/update-user-dto'
import { response } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id:string): Promise<UserDetails | null> {
        return this.userService.findById(id);
    }


    @Put('/:id')
    async updateUser(@Res() response,@Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto) {
        try {
        const user = await this.userService.updateUser(userId, updateUserDto);
        return response.status(HttpStatus.OK).json({
        message: 'User data has been successfully updated',
        user});
        } 
        catch (err) {
            return response.status(err.status).json(err.response);
            }
    }

    @Patch('/:id')
    async addCompletedLesson(@Res() response, @Param('id') userId: string, @Body() body) {
        try {
            const user = await this.userService.addCompletedLesson(userId, body.lessonNum)
            return response.status(HttpStatus.OK).json({user: user})
        }
        catch (err) {
            return response.status(err.status).json(err.response);
            }
    }

    // @Put('info')
    // async updateInfo(
    //     @Req() request: Request,
    //     @Body() body: UserUpdateDto
    // ) {
    //     const id = await this.authService.userId(request);

    //     await this.userService.update(id, body);

    //     return this.userService.findOne({id});
    // }

}
