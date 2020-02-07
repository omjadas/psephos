import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { USER } from "../constants";
import { Election } from "../election/election.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  public pk!: number;

  @Column()
  @Generated("uuid")
  public uuid!: string;

  @Field(_type => ID)
  public get id(): string {
    return toGlobalId(USER, this.uuid);
  }

  @Column({
    type: "varchar",
    nullable: true,
    unique: true,
  })
  public googleId!: string | null;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  public role!: UserRole;

  @Column()
  @Field()
  public name!: string;

  @Column({
    unique: true,
  })
  @Field()
  public email!: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  public password!: string | null;

  @ManyToMany(_type => Election)
  @JoinTable()
  @Field(_type => [Election])
  public votedElections!: Election[];

  @OneToMany(_type => Election, election => election.creator)
  @Field(_type => [Election])
  public createdElections!: Election[];

  @Column({
    default: false,
  })
  public confirmed!: boolean;
}
