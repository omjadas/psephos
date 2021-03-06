import * as Joi from "@hapi/joi";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Response } from "express";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CandidateModule } from "./candidate/candidate.module";
import { NodeEnv } from "./constants";
import { ElectionModule } from "./election/election.module";
import { CSRFMiddleware } from "./middleware/csrf.middleware";
import { PreferenceModule } from "./preference/preference.module";
import { UserModule } from "./user/user.module";
import { VoteModule } from "./vote/vote.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION, NodeEnv.TEST)
          .default(NodeEnv.PRODUCTION),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default("localhost"),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().default("postgres"),
        DB_PASS: Joi.string().default("postgres"),
        DB_NAME: Joi.string().default("postgres"),
        DB_SYNC: Joi.boolean().default(false),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client", "build"),
      serveStaticOptions: {
        cacheControl: true,
        immutable: true,
        maxAge: 31536000000,
        setHeaders: (res: Response, path: string, _stat: any) => {
          if (!path.startsWith("/app/client/build/static/")) {
            res.setHeader("Cache-Control", "public, max-age=0");
          }
        },
      },
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          autoSchemaFile: "schema.gql",
          context: ({ req }) => ({ req }),
          debug: configService.get<string>("NODE_ENV") === NodeEnv.DEVELOPMENT,
          playground: configService.get<string>("NODE_ENV") === NodeEnv.DEVELOPMENT,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASS"),
          database: configService.get<string>("DB_NAME"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: configService.get<boolean>("DB_SYNC"),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CandidateModule,
    ElectionModule,
    PreferenceModule,
    UserModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CSRFMiddleware)
      .forRoutes("*");
  }
}
