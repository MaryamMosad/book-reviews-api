import { IsOptional, IsString } from "class-validator";
import { ArgsType, Field } from "type-graphql";
import { RoleInput } from "./role.input";

@ArgsType()
export class UpdateRoleInput extends RoleInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  permissions: string[];
}
