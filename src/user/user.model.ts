import { AllowNull, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";

@Table({ timestamps: true })
@ObjectType()
export class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @Field(type => ID)
    id: string

    @Unique(true)
    @AllowNull(false)
    @Column
    @Field()
    username: string;

    @AllowNull(false)
    @Column
    @Field()
    email: string

    @Column
    @Field()
    avatar: string;

    @Field({ nullable: true })
    token: string;

    @AllowNull(true)
    @Column
    password: string;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;


}
