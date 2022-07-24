import { ApiProperty } from "@nestjs/swagger"
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/entities/users.entity"

interface postCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, postCreationAttrs> {

  @ApiProperty({ example: '1', description: 'id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'Название', description: 'Название поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @ApiProperty({ example: 'Содержание', description: 'Контент поста' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  content: string

  @ApiProperty({ example: 'https://jdkjhkah', description: 'Путь к фото, если есть' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string

  @ApiProperty({ example: '1', description: 'id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User
}