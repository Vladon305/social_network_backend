import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './entities/users.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { FilesService } from 'src/files/files.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService, private fileService: FilesService) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } })
  }

  async update(id: number, updateUserDto: UpdateUserDto, image?: any) {
    const fileName = await this.fileService.createFile(image)
    return this.userRepository.update({ ...updateUserDto, avatarPath: fileName }, { where: { id } })
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }

  async toggleFriend(userId: number, friendId: number,) { // Not work
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const friend = await this.userRepository.findOne({ where: { id: friendId } })
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(id => id !== friendId)
      friend.friends = friend.friends.filter(id => id !== friendId)
    } else {
      user.friends.push(friend)
      friend.friends.push(user)
    }
    await user.save()
    await friend.save()

    return true
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } })
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('Пользователь или роль не найдена', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('Пользователь не найдена', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
