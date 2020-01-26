import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { threadId } from "worker_threads";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    nullable: true,
    unique: true,
  })
  public googleId?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  public role!: UserRole;

  @Column()
  public name!: string;

  @Column({
    unique: true,
  })
  public email!: string;

  @Column({
    nullable: true,
  })
  public password?: string;
}
