import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Candidate {
  @PrimaryGeneratedColumn()
  public pk!: number;

  @Column()
  @Generated("uuid")
  @Field(_type => ID, { name: "id" })
  public uuid!: string;

  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field()
  public description!: string;

  @ManyToOne(_type => Election, election => election.candidates)
  @Field(_type => Election)
  public election!: Election;
}
