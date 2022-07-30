import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class SignUpInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    avatar: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Field()
    password: string;

}