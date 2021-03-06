import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import CookieParser from "cookie-parser";
import csurf from "csurf";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { NodeEnv } from "./constants";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(CookieParser());
  app.use(helmet());
  app.use(
    configService.get<string>("NODE_ENV", NodeEnv.PRODUCTION) === NodeEnv.PRODUCTION ?
      csurf({ cookie: true }) :
      csurf({ cookie: true, ignoreMethods: ["GET", "HEAD", "OPTIONS", "POST", "PUT"] })
  );

  await app.listen(configService.get<number>("PORT", 3000));
}

bootstrap()
  .catch(() => {
    console.error("Failed to bootstrap psephos");
  });
