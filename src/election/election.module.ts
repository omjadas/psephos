import { Module } from "@nestjs/common";
import { ElectionService } from "./election.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Election } from "./election.entity";
import { UserResolver } from "src/user/user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Election])],
  providers: [ElectionService, UserResolver],
})
export class ElectionModule {}
