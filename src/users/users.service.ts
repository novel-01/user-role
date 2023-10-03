  import { Injectable, BadRequestException, HttpException,HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User, private readonly roleService: RolesService) {
    
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto)
    const role = await this.roleService.getRoleByValue('ADMIN')

    if(!role){
      throw new BadRequestException('Role not found')
    }
    await newUser.$set('roles', [role.id])
    await newUser.save()
    newUser.roles = [role];

    return newUser
  }

  findAll() {
    return this.userRepo.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    return this.userRepo.findByPk(id);
  }

  remove(id: number) {
    return this.userRepo.destroy({where:{id}})
  }


  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {email},
      include: {all: true},
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const upd = await this.userRepo.update(updateUserDto,{where:{id},returning:true})
    return upd[1][0];  }

  async addRole (addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if(role && user){
      await user.$add('roles', role.id);
      const updateUser = await this.userRepo.findByPk(addRoleDto.userId,{include: {all:true}})

      return updateUser;
    }
    throw new  HttpException('Foydalanuvchi yoki role topilmadi', HttpStatus.NOT_FOUND)
  }

  async removeRole (addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value)
    if(role && user){
      await user.$remove('roles', role.id);
      const updateUser = await this.userRepo.findByPk(addRoleDto.userId,{include: {all:true}})
      return updateUser
    }
    throw new  HttpException('Foydalanuvchi yoki role topilmadi', HttpStatus.NOT_FOUND)
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId)
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi',HttpStatus.NOT_FOUND)
    }
    user.is_active = true
    await user.save()
    return user;
  }
}
