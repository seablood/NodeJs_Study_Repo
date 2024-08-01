import { CanActivate, ExecutionContext, Injectable } from  "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private authService: AuthService) {}

    async canActivate(context: any): Promise<boolean> {
        const req = context.switchToHttp().getRequest(); // request 정보 가져오기

        if(req.cookies['login']) {
            console.log(req.cookies['login'])
            return true;
        }

        if(!req.body.email || !req.body.password){
            console.log("..")
            return false;
        }

        const user = await this.authService.validateUser(req.body.email,req.body.password);

        if(user){
            console.log("...")
            req.user = user;
            return true;
        } else {
            console.log("....")
            return false;
        }
    }
}

@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;

        const request = context.switchToHttp().getRequest();
        await super.logIn(request);

        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
    
}