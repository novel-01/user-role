import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiResponse, ApiTags,ApiOperation } from '@nestjs/swagger';
import { User } from './models/user.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('users')
@Roles('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:"Create user"})
  @ApiResponse({status:201, description: 'User created'})
  @HttpCode(200)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @ApiOperation({summary:"Add role to user"})
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({summary: "Change status user"})
  @ApiResponse({status:200, description:"User activated", type:User})
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto)
  }

  @ApiOperation({summary:"Delete role from user"})
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('remove-role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }
  
  @ApiOperation({summary:"Get all user"})
  @ApiResponse({status:200, description: "Users data", type:[User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @ApiOperation({summary:"Get one user"})
  @ApiResponse({status:200, description: "User data", type: [User]})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary:"Update user by id"})
  @ApiResponse({status: 200, description: "Updated user data", type: [User]})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @ApiOperation({summary:"Delete user by id"})
  @ApiResponse({status:200, description: "Deleted user data", type: [User]})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}


// 935029009