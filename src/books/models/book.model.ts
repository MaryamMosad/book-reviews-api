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
import { Author } from "../../authors/author.model";
import { Genre } from "../../genre/genre.model";
import { BookAuthor } from "./book-author.model";
import { BookGenre } from "./book-genre.model";

@Table({ timestamps: true })
@ObjectType()
export class Book extends Model<Book> {
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
  @Column
  @Field()
  cover: string;

  @AllowNull(false)
  @Column(DataType.SMALLINT)
  @Field(() => Int)
  pagesNumber: number;

  @AllowNull(false)
  @Column(DataType.SMALLINT)
  @Field(() => Int)
  publicationYear: number;

  @AllowNull(false)
  @Column(DataType.SMALLINT)
  @Field(() => Int)
  averageRating: number;

  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];

  @BelongsToMany(() => Genre, () => BookGenre)
  genres: Genre[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
