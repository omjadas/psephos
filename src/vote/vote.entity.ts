import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn()
  public pk!: number;

  @Column()
  @Generated("uuid")
  @Field()
  public id!: string;

  @ManyToOne(_type => Election, election => election.votes)
  @Field(_type => Election)
  public election!: Election;
}
