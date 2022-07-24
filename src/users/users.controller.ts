import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
import { AddRoleDto } from './dto/add-role.dto'
import { Roles } from 'src/auth/roles-auth.decorator'
import { BanUserDto } from './dto/ban-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles()
  @Get()
  getAll() {
    return this.usersService.getUsers()
  }

  @ApiOperation({ summary: 'Получить одного пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() image?: any) {
    return this.usersService.update(+id, updateUserDto, image)
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

  @ApiOperation({ summary: 'Добавить в друзья' })
  @ApiResponse({ status: 200, type: 'true' })
  @Patch('friends/:friendId')
  toggleFriend(@Param('friendId') friendId: string, @Body() currentUserId: { id: string }) {

    return this.usersService.toggleFriend(+currentUserId.id, +friendId)
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200, type: User })
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto)
  }
}
