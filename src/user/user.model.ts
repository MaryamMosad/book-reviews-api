import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { Role } from "../roles/role.model";

@Table({ timestamps: true })
@ObjectType()
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field((type) => ID)
  id: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  @Field()
  username: string;

  @AllowNull(false)
  @Column
  @Field()
  email: string;

  @Column
  @Field()
  avatar: string;

  @Field({ nullable: true })
  token: string;

  @AllowNull(true)
  @Column
  password: string;

  @ForeignKey(() => Role)
  @AllowNull(true)
  @Column({ type: DataType.UUID, onDelete: "SET NULL" })
  roleId: string;

  @BelongsTo(() => Role)
  role: Role;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
