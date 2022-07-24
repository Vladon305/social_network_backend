import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from 'src/roles/entities/roles.entity'
import { UserRoles } from 'src/roles/entities/user-roles.entity'
import { UsersController } from './users.controller'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
import { RolesService } from '../roles/roles.service'
import { AuthModule } from 'src/auth/auth.module'
import { Post } from 'src/posts/entities/post.entity'
import { FilesModule } from 'src/files/files.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    forwardRef(() => AuthModule),
    FilesModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
