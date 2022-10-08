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
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Book } from "../books/models/book.model";
import { User } from "../user/user.model";

@Table({ timestamps: true })
@ObjectType()
export class Review extends Model<Review> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field((type) => ID)
  id: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  @Field()
  title: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  @Field()
  review: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.UUID, onDelete: "CASCADE" })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Book)
  @AllowNull(false)
  @Column({ type: DataType.UUID, onDelete: "CASCADE" })
  bookId: string;

  @BelongsTo(() => Book)
  book: Book;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
