import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, Length, IsString } from "class-validator"

export class CreateUserDto {

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3)
  readonly name: string

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3)
  readonly surname: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string

  @ApiProperty({ example: '12345678', description: 'Пороль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6)
  readonly password: string
}