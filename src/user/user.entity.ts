import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    type: "text",
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
    type: "text",
    nullable: true,
  })
  public password!: string | null;
}
