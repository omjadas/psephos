import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { Vote } from "../vote/vote.entity";

@Entity()
@ObjectType()
export class Election {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

  @Field()
  public name!: string;

  @Field()
  public description!: string;

  public candidates!: Candidate[];

  public votes!: Vote[];
}
