import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import CookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>("PORT", 3000));
}

bootstrap();
