import { ObjectType, Field, Authorized, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity({ name: "users" })
@ObjectType()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field()
  @Column({ default: false })
  isPhoneNumberVerified: boolean;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field()
  @Authorized("OWNER")
  @Column({ unique: true })
  @IsEmail({}, { message: "Incorrect email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: "Firebase UID is required" })
  firebaseUid!: string;
}
