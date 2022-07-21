import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/entities/users.entity'
import { RolesController } from './roles.controller'
import { Role } from './entities/roles.entity'
import { RolesService } from './roles.service'
import { UserRoles } from './entities/user-roles.entity'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [RolesService]
})
export class RolesModule { }
