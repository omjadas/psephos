import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Candidate } from "src/candidate/candidate.entity";
import { Vote } from "src/vote/vote.entity";
import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

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
  @Field(_type => Number)
  public preference!: number;

  @Column()
  public voteId!: string;

  @ManyToOne(_type => Vote, vote => vote.preferences, { onDelete: "CASCADE" })
  @Field(_type => Vote)
  public vote!: Election;

  @Column()
  public candidateId!: number;

  @ManyToOne(_type => Candidate, { onDelete: "RESTRICT" })
  @Field(_type => Candidate)
  public candidate!: Candidate;
}
