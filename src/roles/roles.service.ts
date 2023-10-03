import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {InjectModel} from '@nestjs/sequelize';
import {Role} from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepo.create(createRoleDto)
  }

  async findAll() {
    return this.roleRepo.findAll({include: {all:true}});
  }

  async getRoleByValue(value: string) {
    return this.roleRepo.findOne({where:{value}})
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const upd = await this.roleRepo.update(updateRoleDto,{where:{id},returning:true})
    return upd[1][0];
  }

  remove(id: number) {
    return this.roleRepo.destroy({where:{id}})
  }
}
