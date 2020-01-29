import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import CookieParser from "cookie-parser";
import csurf from "csurf";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  app.use(helmet());
  app.use(csurf());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>("PORT", 3000));
}

bootstrap();
