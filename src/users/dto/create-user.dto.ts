import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsEmail,IsString,IsStrongPassword} from 'class-validator';
export class CreateUserDto {
    @ApiProperty({example:'user1',description: "user name"})
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({example:'user1@gmail.com',description: "user email"})
    @IsEmail()
    email: string;
   
    @ApiProperty({example:'Uzbek!$st0n',description: "user  password"})
    @IsStrongPassword({minLength: 6})
    password: string;
}
