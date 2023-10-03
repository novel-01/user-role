import { Model, Column, DataType, Table,  ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from 'src/users/models/user.model';

interface IPostAttrs {
    title: string;
    content:string;
    image:string;
    userId:number;
}

@Table({ tableName: 'posts' })
export class Posts extends Model<Posts, IPostAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
  })
  content:string;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
  })
  image:string;

  
  @ForeignKey(()=> User)
  @Column({
    type:DataType.INTEGER,
    onDelete: "CASCADE"
  })
  userId:number;

  @BelongsTo(()=> User)
  author:User;

}

