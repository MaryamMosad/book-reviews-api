import { Author } from "../../authors/author.model";
import { BookAuthor } from "../../books/models/book-author.model";
import { BookGenre } from "../../books/models/book-genre.model";
import { Book } from "../../books/models/book.model";
import { Genre } from "../../genre/genre.model";
import { Review } from "../../reviews/review.model";
import { Role } from "../../roles/role.model";
import { User } from "../../user/user.model";

export const models = [
  User,
  Genre,
  Role,
  Book,
  Author,
  Review,
  BookAuthor,
  BookGenre,
];
