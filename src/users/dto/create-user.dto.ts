import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
  readonly name: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  readonly surname: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  readonly email: string

  @ApiProperty({ example: '12345678', description: 'Пороль пользователя' })
  readonly password: string
}