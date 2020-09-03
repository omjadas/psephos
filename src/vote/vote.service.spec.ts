import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";

describe("VoteService", () => {
  let service: VoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        {
          provide: getRepositoryToken(Vote),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VoteService>(VoteService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
