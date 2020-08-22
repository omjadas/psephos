import { Resolver } from "@nestjs/graphql";
import { Election } from "./election.entity";
import { ElectionService } from "./election.service";

@Resolver(Election)
export class ElectionResolver {
  public constructor(
    private readonly electionService: ElectionService
  ) { }
}
