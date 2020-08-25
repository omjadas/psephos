import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Candidate {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column()
  @Field()
  public name!: string;

  @Column({ unique: true })
  @Field()
  public slug!: string;

  @Column()
  @Field()
  public description!: string;

  @Column()
  public electionId!: string;

  @ManyToOne(_type => Election, election => election.candidates)
  @Field(_type => Election)
  public election!: Election;
}
