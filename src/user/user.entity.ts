import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Election } from "../election/election.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(_type => Int)
  public id!: number;

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
  public elections!: Election[];
}
