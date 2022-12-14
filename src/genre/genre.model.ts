import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { BookGenre } from "../books/models/book-genre.model";
import { Book } from "../books/models/book.model";

@Table({ timestamps: true })
@ObjectType()
export class Genre extends Model<Genre> {
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
  @Default(true)
  @Column
  @Field()
  isActive: boolean;

  @BelongsToMany(() => Book, () => BookGenre)
  books: Book[];
}
