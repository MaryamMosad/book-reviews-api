import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";

@Table({ timestamps: true })
@ObjectType()
export class Role extends Model<Role> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field((type) => ID)
  id: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  @Field()
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  @Field(() => [String])
  permissions: string[];
}
