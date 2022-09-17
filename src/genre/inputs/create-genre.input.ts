import { IsString } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
export class CreateGenreInput {
  @IsString()
  @Field()
  name: string;
}
