import { ForbiddenException, NotFoundException, UseGuards } from "@nestjs/common";
import { Args, GraphQLISODateTime, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Candidate } from "../candidate/candidate.entity";
import { CandidateService } from "../candidate/candidate.service";
import { CurrentUser } from "../user/decorators/currentUser";
import { User } from "../user/user.entity";
import { Election } from "./election.entity";
import { ElectionService } from "./election.service";

@Resolver(Election)
export class ElectionResolver {
  public constructor(
    private readonly electionService: ElectionService,
    private readonly candidateService: CandidateService,
  ) { }

  @Query(_returns => Election, { name: "election" })
  @UseGuards(GqlAuthGuard)
  public async getElection(
    @Args("slug") slug: string
  ): Promise<Election> {
    const election = await this.electionService.findByProp(
      "slug",
      slug,
      ["creator"]
    );
    if (election === undefined) {
      throw new NotFoundException();
    }
    return election;
  }

  @Query(_returns => [Election], { name: "elections" })
  @UseGuards(GqlAuthGuard)
  public getElections(@CurrentUser() user: User): Promise<Election[]> {
    return this.electionService.findVisible(user, ["creator"]);
  }

  @ResolveField()
  public candidates(@Parent() election: Election): Promise<Candidate[]> {
    return this.candidateService.findAllByProp("electionId", election.id);
  }

  @Mutation(_returns => Election)
  @UseGuards(GqlAuthGuard)
  public createElection(
    @Args("name") name: string,
      @Args("seats", { type: () => Int }) seats: number,
      @Args("startTime", { type: () => GraphQLISODateTime }) startTime: Date,
      @Args(
        "finishTime",
        {
          type: () => GraphQLISODateTime,
          nullable: true,
        }
      ) finishTime: Date | null,
      @Args("description") description: string,
      @CurrentUser() user: User
  ): Promise<Election> {
    return this.electionService.create(
      name,
      seats,
      startTime,
      finishTime,
      description,
      user
    );
  }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async deleteElection(
    @Args("id", { type: () => ID }) id: string,
      @CurrentUser() user: User,
  ): Promise<boolean> {
    const election = await this.electionService.findById(id);

    if (election?.creatorId !== user.id) {
      throw new ForbiddenException();
    }

    await this.electionService.deleteById(id);
    return true;
  }

  @Mutation(_returns => Election)
  @UseGuards(GqlAuthGuard)
  public async updateElection(
    @Args("id", { type: () => ID }) id: string,
      @CurrentUser() user: User,
      @Args("name", { nullable: true }) name?: string,
      @Args("seats", { nullable: true }) seats?: number,
      @Args(
        "startTime",
        {
          type: () => GraphQLISODateTime,
          nullable: true,
        }
      ) startTime?: Date,
      @Args(
        "finishTime",
        {
          type: () => GraphQLISODateTime,
          nullable: true,
        }
      ) finishTime?: Date | null,
      @Args("description", { nullable: true }) description?: string
  ): Promise<Election> {
    const election = await this.electionService.findById(id);

    if (election === undefined) {
      throw new NotFoundException();
    }

    if (election.creatorId !== user.id) {
      throw new ForbiddenException();
    }

    election.name = name ?? election.name;
    election.seats = seats ?? election.seats;
    election.startTime = startTime ?? election.startTime;
    election.finishTime = finishTime ?? election.finishTime;
    election.description = description ?? election.description;
    this.electionService.save(election);
    return election;
  }

  @Mutation(_returns => [Candidate])
  @UseGuards(GqlAuthGuard)
  public async countVotes(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Candidate[]> {
    const election = await this.electionService.findById(
      id,
      [
        "candidates",
        "votes",
        "votes.preferences",
      ]
    );
    if (election === undefined) {
      throw new NotFoundException();
    }
    await this.electionService.countVotes(election);
    return election.candidates;
  }
}
