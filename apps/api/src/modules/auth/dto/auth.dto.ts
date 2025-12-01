import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";     
import { IsPasswordsMatchingConstraint } from "src/libs/common/password-matching.decorator";

export class RegisterDto{
    @ApiProperty({example: 'John', description: 'User name'})
    @IsString()
    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @ApiProperty({example: 'Doe', description: 'User surname'})
    @IsString()
    @IsNotEmpty({message: 'Surname is required'})
    surname: string;

    @ApiProperty({example: 'john.doe@example.com', description: 'User email'})
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    email: string;

    @ApiProperty({example: '12345678', description: 'User password'})
    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @IsNotEmpty({message: 'Password is required'})
    password: string;

    @ApiProperty({example: '12345678', description: 'Repeat password'})
    @IsString()
    @MinLength(8, {message: 'Repeat password must be at least 8 characters long'})
    @IsNotEmpty({message: 'Repeat password is required'})
    @Validate(IsPasswordsMatchingConstraint, {message: 'Passwords do not match', each: true})
    repeatPassword: string;
}
export class LoginDto{

    @ApiProperty({example: 'john.doe@example.com', description: 'User email'})
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    email: string;

    @ApiProperty({example: '12345678', description: 'User password'})
    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @IsNotEmpty({message: 'Password is required'})
    password: string;
}
export class ResetPasswordDto{

    token: string;
    newPassword: string;
}