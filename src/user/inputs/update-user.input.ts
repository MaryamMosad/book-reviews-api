import { IsOptional, IsString } from "class-validator";
import { ArgsType, Field } from "type-graphql";
@ArgsType()
export class UpdateUserInput {

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    username: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    avatar: string;
}