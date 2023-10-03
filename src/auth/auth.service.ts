import { Injectable,HttpException,HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt  from "bcrypt"
import { User } from 'src/users/models/user.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService:JwtService) {}

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST)
    }
    const hashedPass = await bcrypt.hash(userDto.password,7);
    const user = await this.userService.create({
      ...userDto,
      password:hashedPass
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles};
    return { token: this.jwtService.sign(payload) }
  }

  async login(loginDto: LoginDto){
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user){
      throw new UnauthorizedException("Email or password incorrect");
    }
    const validPass = await bcrypt.compare(loginDto.password, user.password);

    if (!validPass){
      throw new UnauthorizedException("Email or password incorrect");
    }
    return this.generateToken(user)
  }

}

