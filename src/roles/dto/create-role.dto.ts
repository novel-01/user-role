import { IsUppercase,IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsUppercase()
    @IsNotEmpty()
    @IsString()
    value: string;
    
    @IsString()
    @IsNotEmpty()
    description:string;
}
