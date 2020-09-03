import { Resolver } from "@nestjs/graphql";
import { Vote } from "./vote.entity";

@Resolver(Vote)
export class VoteResolver {}
