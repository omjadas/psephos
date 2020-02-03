import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { User } from "../user/user.entity";
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

  @ManyToOne(_type => User)
  @Field(_type => User)
  public creator!: User;

  @Column()
  @Field()
  public description!: string;

  @OneToMany(_type => Candidate, candidate => candidate.election)
  @Field(_type => [Candidate])
  public candidates!: Candidate[];

  @OneToMany(_type => Vote, vote => vote.election)
  @Field(_type => [Vote])
  public votes!: Vote[];
}
