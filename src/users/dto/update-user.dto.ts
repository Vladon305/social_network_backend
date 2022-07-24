import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3)
  readonly name?: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email?: string

  @ApiProperty({ example: '12345678', description: 'Пороль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6)
  readonly password?: string

  @ApiProperty({ example: '1/02/2000', description: 'Дата рождения' })
  @IsString({ message: 'Должно быть строкой' })
  readonly birthDate?: string

  @ApiProperty({ example: 'Москва', description: 'Город проживания' })
  @IsString({ message: 'Должно быть строкой' })
  readonly city?: string

  @ApiProperty({ example: 'Мужской', description: 'Пол' })
  @IsString({ message: 'Должно быть строкой' })
  readonly gender?: string

  @ApiProperty({ example: 'https://qer93u19198r', description: 'Путь к фотографии пользователя' })
  readonly avatarPath?: string
}