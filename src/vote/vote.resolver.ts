import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/strategies/jwt.gql.strategy";
import { Preference } from "../preference/preference.entity";
import { PreferenceInput } from "../preference/preference.input";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";

@Resolver(Vote)
export class VoteResolver {
  public constructor(
    private readonly voteService: VoteService
  ) { }

  @Mutation(_returns => Boolean)
  @UseGuards(GqlAuthGuard)
  public async createVote(
    @Args("electionId", { type: () => ID }) electionId: string,
      @Args("preferences", { type: () => [PreferenceInput] }) preferences: PreferenceInput[]
  ): Promise<boolean> {
    const vote = new Vote();
    vote.electionId = electionId;
    vote.preferences = [];

    preferences.forEach(pref => {
      const preference = new Preference();
      preference.candidateId = pref.candidateId;
      preference.preference = pref.preference;
      vote.preferences.push(preference);
    });

    try {
      await this.voteService.save(vote);
      return true;
    } catch (e) {
      return false;
    }
  }
}
