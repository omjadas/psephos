import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Election } from "../election/election.entity";
import { ElectionService } from "../election/election.service";
import { Candidate } from "./candidate.entity";
import { CandidateService } from "./candidate.service";

describe("CandidateService", () => {
  let service: CandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        ElectionService,
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
