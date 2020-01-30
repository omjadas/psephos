import { Field, Int, ObjectType } from "type-graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

  @ManyToOne(_type => Election, election => election.votes)
  public election!: Election;
}
