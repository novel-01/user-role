import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/role.model';
import { UsersModule } from './users/users.module';
import { UserRoles } from './roles/models/user-roles.model';
import { User } from './users/models/user.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/models/post.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';


@Module({
  imports: [
  ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname,'static')
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.POSTGES_HOST,
        port: Number(process.env.POSTGES_PORT),
        username: process.env.POSTGES_USER,
        password: String(process.env.POSTGES_PASSWORD),
        database: process.env.POSTGES_DB,
        models: [Role,User,UserRoles,Posts],
        autoLoadModels: true,
        logging: false,
      }),
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
