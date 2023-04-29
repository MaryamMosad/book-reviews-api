import { IsString } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateRoleInput {
  @IsString()
  @Field()
  name: string;

  @IsString({ each: true })
  @Field(() => [String])
  permissions: string[];
}
