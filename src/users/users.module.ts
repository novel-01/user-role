import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from 'src/roles/models/role.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AuthModule } from 'src/auth/auth.module';
import { Posts } from 'src/posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([User,Role,UserRoles,Posts]),
  forwardRef(() => AuthModule)
],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService]
})
export class UsersModule {}
