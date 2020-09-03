import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Candidate } from "src/candidate/candidate.entity";
import { Election } from "src/election/election.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Winner {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column()
  @Field()
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
