import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Winner {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column()
  public candidateId!: string;

  @ManyToOne(_type => Candidate)
  @Field(_type => Candidate)
  public candidate!: Candidate;

  @Column({ type: "tinyint" })
  @Field(_type => Int)
  public seats!: number;

  @Column()
  public electionId!: string;

  @ManyToOne(_type => Election, election => election.winners)
  @Field(_type => Election)
  public election!: Election;
}
