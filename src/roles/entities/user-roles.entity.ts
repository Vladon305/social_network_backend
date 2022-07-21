import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/entities/users.entity"
import { Role } from "./roles.entity"

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, unique: true })
  roleId: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true })
  userId: number
}