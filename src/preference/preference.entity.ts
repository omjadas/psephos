import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { Election } from "../election/election.entity";
import { Vote } from "../vote/vote.entity";

@Entity()
@ObjectType()
export class Preference {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column({
    type: "smallint",
  })
  @Check("preference >= 0")
  @Field(_type => Int)
  public preference!: number;

  @Column()
  public voteId!: string;

  @ManyToOne(_type => Vote, vote => vote.preferences, { onDelete: "CASCADE" })
  @Field(_type => Vote)
  public vote!: Election;

  @Column()
  public candidateId!: string;

  @ManyToOne(_type => Candidate, { onDelete: "RESTRICT" })
  @Field(_type => Candidate)
  public candidate!: Candidate;
}
