import { ForbiddenException, NotFoundException, UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { ElectionService } from "../election/election.service";
import { Preference } from "../preference/preference.entity";
import { PreferenceInput } from "../preference/preference.input";
import { PreferenceService } from "../preference/preference.service";
import { CurrentUser } from "../user/decorators/currentUser";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";

@Resolver(Vote)
export class VoteResolver {
  public constructor(
    private readonly voteService: VoteService,
    private readonly preferenceService: PreferenceService,
    private readonly electionService: ElectionService,
    private readonly userService: UserService
  ) { }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async createVote(
    @Args("electionId", { type: () => ID }) electionId: string,
      @Args(
        "preferences",
        {
          type: () => [PreferenceInput],
        }
      ) preferences: PreferenceInput[],
      @CurrentUser() user: User
  ): Promise<boolean> {
    const election = await this.electionService.findById(electionId);

    if (election === undefined) {
      throw new NotFoundException();
    }

    for (const e of user.votedElections) {
      if (e.id === electionId) {
        throw new ForbiddenException();
      }
    }

    const now = new Date();

    if (
      election.startTime > now ||
      election.finishTime && election.finishTime < now
    ) {
      throw new ForbiddenException();
    }

    const vote = new Vote();
    vote.electionId = electionId;
    vote.preferences = [];
    await this.voteService.save(vote);

    await Promise.all(preferences.map(pref => {
      const preference = new Preference();
      preference.candidateId = pref.candidateId;
      preference.preference = pref.preference;
      preference.voteId = vote.id;
      return this.preferenceService.save(preference);
    }));

    user.votedElections.push(election);
    await this.userService.save(user);

    return true;
  }
}
