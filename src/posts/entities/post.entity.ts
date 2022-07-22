import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/entities/users.entity"

interface postCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({ tableName: 'users' })
export class Post extends Model<Post, postCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  content: string

  @Column({ type: DataType.STRING, allowNull: true })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User
}