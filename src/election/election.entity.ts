import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { User } from "../user/user.entity";
import { Vote } from "../vote/vote.entity";

@Entity()
@ObjectType()
export class Election {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column()
  @Field()
  public name!: string;

  @Column({ unique: true })
  @Field()
  public slug!: string;

  @Column({ type: "timestamptz", nullable: true })
  @Field(_type => GraphQLISODateTime, { nullable: true })
  public startTime!: Date;

  @Column({ type: "timestamptz", nullable: true })
  @Field(_type => GraphQLISODateTime, { nullable: true })
  public finishTime!: Date | null;

  @Column()
  public creatorId!: string;

  @ManyToOne(_type => User, user => user.createdElections)
  @Field(_type => User)
  public creator!: User;

  @Column()
  @Field()
  public description!: string;

  @Column({ type: "smallint" })
  @Field(_type => Int)
  public seats!: number;

  @OneToMany(_type => Candidate, candidate => candidate.election)
  @Field(_type => [Candidate])
  public candidates!: Candidate[];

  @OneToMany(_type => Vote, vote => vote.election)
  @Field(_type => [Vote])
  public votes!: Vote[];
}
