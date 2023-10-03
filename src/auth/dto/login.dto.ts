import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'example@gmail.com', description: 'email'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'pass@or12rt', description: 'password'})
    @IsStrongPassword()
    readonly password: string;
}