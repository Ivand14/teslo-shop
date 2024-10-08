import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class createUserDto{
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string

    @IsString()
    @MinLength(1)
    fullName:string
}