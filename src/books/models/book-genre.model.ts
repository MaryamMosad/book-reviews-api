import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Author } from "../../authors/author.model";
import { Genre } from "../../genre/genre.model";
import { Book } from "./book.model";

@Table({ timestamps: true })
export class BookGenre extends Model {
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @ForeignKey(() => Genre)
  @Column
  genreId: number;
}
