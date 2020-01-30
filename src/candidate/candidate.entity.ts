import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Candidate {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

  @Field()
  public name!: string;

  @Field()
  public description!: string;
}
