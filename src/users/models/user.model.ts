import { BelongsToMany, Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Role } from "src/roles/models/role.model";
import { UserRoles } from "src/roles/models/user-roles.model";
import { Posts } from 'src/posts/models/post.model';
import {ApiProperty} from "@nestjs/swagger";

interface IUserCreationAttrs {
    name: string;
    email: string;
    password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User,IUserCreationAttrs>{

    @ApiProperty({example: '1', description: 'unique id'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
      })
      id: number;

    @ApiProperty({example: 'user1', description: 'user name'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      name: string;

    @ApiProperty({example: 'email@mail.ru', description: 'user email'})
    @Column({
        type: DataType.STRING, 
        allowNull: false,
      })
    email: string;

    @ApiProperty({example: 'true', description: 'is user active'})
    @Column({
        type: DataType.BOOLEAN, 
        allowNull: false,
        defaultValue: true,
      })
      is_active: boolean;

    @ApiProperty({example: 'Uzbek!$st0n', description: 'user  password'})
    @Column({
        type: DataType.STRING, 
        allowNull: false,
      })
    password: string;

    @BelongsToMany(()=> Role,()=> UserRoles)
    roles: Role[]

    @HasMany(()=> Posts)
    post: Posts
}