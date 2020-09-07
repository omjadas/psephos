import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { CandidateService } from "../candidate/candidate.service";
import { Election } from "../election/election.entity";
import { ElectionService } from "../election/election.service";
import { Preference } from "../preference/preference.entity";
import { PreferenceService } from "../preference/preference.service";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Vote } from "./vote.entity";
import { VoteResolver } from "./vote.resolver";
import { VoteService } from "./vote.service";

describe("VoteResolver", () => {
  let resolver: VoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteResolver,
        VoteService,
        PreferenceService,
        ElectionService,
        UserService,
        CandidateService,
        {
          provide: getRepositoryToken(Vote),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Preference),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<VoteResolver>(VoteResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
