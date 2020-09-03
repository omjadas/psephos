import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Preference } from "src/preference/preference.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  public id!: string;

  @Column()
  public electionId!: string;

  @ManyToOne(
    _type => Election,
    election => election.votes,
    { onDelete: "CASCADE" }
  )
  @Field(_type => Election)
  public election!: Election;

  @OneToMany(_type => Preference, preference => preference.vote)
  @Field(_type => [Preference])
  public preferences!: Preference[];
}
