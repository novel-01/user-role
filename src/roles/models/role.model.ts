import { Model, Column, DataType, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { User } from "src/users/models/user.model";
import { UserRoles } from "./user-roles.model";
import {ApiProperty} from "@nestjs/swagger";

interface IRoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttrs> {

  @ApiProperty({example: '1', description: 'unique id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'role name'})
  @Column({
    type: DataType.STRING, 
    allowNull: true,
  })
  value: string;

  @ApiProperty({example: 'Administrator', description: 'role description'})
  @Column({
    type: DataType.STRING, 
    allowNull: true,
  })
  description: string;

  @BelongsToMany(()=>User ,()=> UserRoles)
  roles: User[]

}
