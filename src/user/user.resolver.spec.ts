import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidate } from "../candidate/candidate.entity";
import { CandidateService } from "../candidate/candidate.service";
import { Election } from "../election/election.entity";
import { ElectionService } from "../election/election.service";
import { User } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

describe("UserResolver", () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        ElectionService,
        CandidateService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
