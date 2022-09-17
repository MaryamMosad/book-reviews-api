import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
import { ArgsType, Field, ID, InputType } from "type-graphql";

@ArgsType()
export class UpdateGenreInput {
  @IsUUID("4")
  @Field(() => ID)
  genreId: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isActive: boolean;
}
