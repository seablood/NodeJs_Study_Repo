import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUser } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUser) {
        const user = await this.userService.findUser(userDto.email);

        if(user){
            throw new HttpException(
                '해당 유저가 이미 존재합니다. ', 
                HttpStatus.BAD_REQUEST
            );
        } else {
            const bcryptPassword = bcrypt.hashSync(userDto.password, 10);
            userDto.password = bcryptPassword;

            try {
                const user = await this.userService.saveUser(userDto);
                
                user.password = undefined;
                return user;
            } catch (error) {
                throw new HttpException(
                    '유저 저장에 실패하였습니다. ', 
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUser(email);

        if(user){
            const {password: hashValue, ...userInfo} = user;

            if(bcrypt.compareSync(password, hashValue)){
                return userInfo;
            }
        }

        return null;
    }
}
