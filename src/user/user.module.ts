import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElectionModule } from "../election/election.module";
import { User } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ElectionModule,
  ],
  providers: [
    UserService,
    UserResolver,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule { }
