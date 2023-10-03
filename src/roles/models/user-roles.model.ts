import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";
import { Role } from "./role.model";

@Table({tableName: "users_roles", createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER})
    userId:number;
    
    @ForeignKey(()=> Role)
    @Column({type: DataType.INTEGER})
    roleId:number;
}