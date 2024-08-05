import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user.email);
    }
    async deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
        const user = await this.userService.findUser(payload);

        if(!user){
            done(new Error('인증되지 않은 유저입니다. '), null);
            return;
        }

        const {password, ...userInfo} = user;

        done(null, userInfo);
    }
    
}