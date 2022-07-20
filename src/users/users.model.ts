import { ApiProperty } from "@nestjs/swagger"
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Role } from "src/roles/roles.model"
import { UserRoles } from "src/roles/user-roles.model"

interface userCreationAttrs {
  name: string
  surname: string
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, userCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: '12345678', description: 'Пороль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: '1/02/2000', description: 'Дата рождения' })
  @Column({ type: DataType.STRING, allowNull: true })
  birthDate: string

  @ApiProperty({ example: 'Москва', description: 'Город проживания' })
  @Column({ type: DataType.STRING, allowNull: true })
  city: string

  @ApiProperty({ example: 'Мужской', description: 'Пол' })
  @Column({ type: DataType.STRING, allowNull: true })
  gender: string

  @ApiProperty({ example: 'https://qer93u19198r', description: 'Путь к фотографии пользователя' })
  @Column({ type: DataType.STRING, allowNull: true })
  avatarPath: string

  @ApiProperty({ example: 'true', description: 'Забанен ли пользователь' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: 'Из-за ....', description: 'Причина бана' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}