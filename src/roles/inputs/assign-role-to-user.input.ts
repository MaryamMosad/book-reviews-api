import { IsUUID } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class AssignRoleToUserInput {
  @IsUUID("4")
  @Field()
  userId: string;

  @IsUUID("4")
  @Field({ nullable: true })
  roleId: string;
}
