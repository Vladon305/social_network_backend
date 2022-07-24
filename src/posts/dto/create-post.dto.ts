import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreatePostDto {

  @ApiProperty({ example: 'Пост', description: 'Имя поста' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string

  @ApiProperty({ example: 'этот пост ...', description: 'Контент поста' })
  @IsString({ message: 'Должно быть строкой' })
  readonly content: string

  @ApiProperty({ example: '1', description: 'Id пользователя создавшего пост' })
  readonly userId: number
}
