import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { BookAuthor } from "../books/models/book-author.model";
import { Book } from "../books/models/book.model";

@Table({ timestamps: true })
@ObjectType()
export class Author extends Model<Author> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field((type) => ID)
  id: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  @Field()
  firstName: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  @Field()
  lastName: string;

  @AllowNull(true)
  @Column
  @Field()
  bio: string;

  @AllowNull(true)
  @Column
  birthCountry: string;

  @AllowNull(true)
  @Column
  @Field(() => Int)
  booksNumber: string;

  @BelongsToMany(() => Book, () => BookAuthor)
  books: Book[]

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
