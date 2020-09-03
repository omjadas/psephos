import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vote } from "./vote.entity";
import { VoteResolver } from "./vote.resolver";
import { VoteService } from "./vote.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
  ],
  providers: [
    VoteService,
    VoteResolver,
  ],
})
export class VoteModule {}
