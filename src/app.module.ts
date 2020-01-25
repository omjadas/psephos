import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SYNC } from "./constants";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client", "build"),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [],
      synchronize: DB_SYNC,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
