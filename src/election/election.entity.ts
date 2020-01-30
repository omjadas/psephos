import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { Vote } from "../vote/vote.entity";

@Entity()
@ObjectType()
export class Election {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field()
  public description!: string;

  @OneToMany(_type => Candidate, candidate => candidate.election)
  public candidates!: Candidate[];

  @OneToMany(_type => Vote, vote => vote.election)
  public votes!: Vote[];
}
