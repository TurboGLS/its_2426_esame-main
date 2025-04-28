import { IsEmail, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class AddUserDTO {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    role: string;

    @IsUrl()
    picture: string;

    @IsEmail()
    username: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}