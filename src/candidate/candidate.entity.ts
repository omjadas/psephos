import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Candidate {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field()
  public description!: string;

  @ManyToOne(_type => Election, election => election.candidates)
  public election!: Election;
}
