import { Controller,  Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Registration'})
  @ApiResponse({status: 200, type: ApiProperty, description: 'User registration'})
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiResponse({status: 200, type: ApiProperty, description: 'User login'})
  @ApiOperation({summary: 'Login'})
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
