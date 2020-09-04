import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CandidateService } from "../candidate/candidate.service";
import { Election } from "./election.entity";
import { ElectionService } from "./election.service";

describe("ElectionService", () => {
  let service: ElectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionService,
        CandidateService,
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ElectionService>(ElectionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
