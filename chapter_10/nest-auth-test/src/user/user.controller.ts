import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/create')
    createUser(@Body() user: CreateUser) {
        return this.userService.saveUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        const user = await this.userService.findUser(email);
        console.log(user);
        return user;
    }

    @Put('/updateUser/:email')
    updateUser(@Param('email') email: string, @Body() data: UpdateUser){
        return this.userService.updateUser(email, data);
    }

    @Delete('/deleteUser/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }
}
