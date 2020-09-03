import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Candidate } from "./candidate.entity";
import { CandidateResolver } from "./candidate.resolver";
import { CandidateService } from "./candidate.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [
    CandidateService,
    CandidateResolver,
  ],
  exports: [
    CandidateService,
  ],
})
export class CandidateModule { }
