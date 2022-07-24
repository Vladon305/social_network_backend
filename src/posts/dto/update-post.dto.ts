import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { CreatePostDto } from './create-post.dto'

export class UpdatePostDto extends PartialType(CreatePostDto) {

  @ApiProperty({ example: 'Пост', description: 'Имя поста' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string

  @ApiProperty({ example: 'этот пост ...', description: 'Контент поста' })
  @IsString({ message: 'Должно быть строкой' })
  readonly content: string
}
