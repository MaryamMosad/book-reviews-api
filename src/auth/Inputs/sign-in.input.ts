import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";
@ArgsType()
export class SignInInput {
    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Field()
    password: string;
}