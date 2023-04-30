import { IsUUID } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RoleInput {
  @IsUUID("4")
  @Field()
  roleId: string;
}
