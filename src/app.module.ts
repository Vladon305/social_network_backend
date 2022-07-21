import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users/entities/users.entity'
import { UsersModule } from './users/users.module'
import { RolesController } from './roles/roles.controller'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/entities/roles.entity'
import { UserRoles } from './roles/entities/user-roles.entity'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ],
  controllers: [RolesController],
  providers: []
})
export class AppModule { }
