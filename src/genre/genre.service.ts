import { BaseException } from "../common/exceptions/errors";
import { Genre } from "./genre.model";
import { CreateGenreInput } from "./inputs/create-genre.input";
import { UpdateGenreInput } from "./inputs/update-genre.input";

export class GenreService {
  async genres() {
    return await Genre.findAll();
  }
  async createGenre(input: CreateGenreInput) {
    return await Genre.create(input);
  }

  async getValidGenreOrError(genreId: string) {
    const genre = await Genre.findOne({ where: { id: genreId } });
    if (!genre) throw new BaseException(605);
    return genre;
  }
  async updateGenre(input: UpdateGenreInput) {
    await this.getValidGenreOrError(input.genreId);
    const genre = await Genre.update(input, {
      where: { id: input.genreId },
      returning: true,
    });
    return genre[1][0];
  }
}
