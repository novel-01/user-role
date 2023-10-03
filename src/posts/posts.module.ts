import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './models/post.model';
import { User } from 'src/users/models/user.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
  SequelizeModule.forFeature([User, Posts]), FilesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports:[PostsService],
})
export class PostsModule {}
