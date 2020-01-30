import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;
}
