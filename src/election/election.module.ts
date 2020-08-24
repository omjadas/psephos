import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Election } from "./election.entity";
import { ElectionResolver } from "./election.resolver";
import { ElectionService } from "./election.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Election]),
  ],
  providers: [
    ElectionService,
    ElectionResolver,
  ],
  exports: [ElectionService],
})
export class ElectionModule { }
