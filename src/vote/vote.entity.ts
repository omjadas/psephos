import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @ManyToOne(_type => Election, election => election.votes)
  @Field(_type => Election)
  public election!: Election;
}
