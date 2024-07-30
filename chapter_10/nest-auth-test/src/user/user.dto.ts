import { IsString, IsEmail } from "class-validator";

export class CreateUser {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UpdateUser {
    @IsString()
    username: string;

    @IsString()
    password: string;
}