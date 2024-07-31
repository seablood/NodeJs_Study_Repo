import { Controller, Post, Body, Request, Response, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() userDto: CreateUser) {
        return await this.authService.register(userDto);
    }

    @Post('/login')
    async userLogin(@Request() req, @Response() res) {
        const {email, password} = req.body;

        const user = await this.authService.validateUser(email, password);

        if(user){
            res.cookie('login', JSON.stringify(user), {
                httpOnly: false, 
                maxAge: 1000*60*60*24*7, 
            });

            return res.send({message: 'login success'});
        } else {
            return res.send({message: 'login fail'});
        }
    }

    @UseGuards(LoginGuard)
    @Post('/loginOfGuard')
    async loginOfGuard(@Request() req, @Response() res) {
        if(!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: false, 
                maxAge: 1000*10, 
            });

            return res.send({message: 'Login Success'});
        }

        else {
            res.clearCookie('login');
            return res.send({message: 'login fail'});
        }
    }

    @UseGuards(LoginGuard)
    @Get('/test-guard')
    testGuard() {
        return '로그인할 때만 보이는 페이지';
    }
}
