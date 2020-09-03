import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PreferenceInput {
  @Field(_type => ID)
  public candidateId!: string;

  @Field(_type => Int)
  public preference!: number;
}
