import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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
  public name!: string;

  @Column({
    unique: true,
  })
  public email!: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  public password!: string | null;
}
