#!/usr/bin/env -S npx ts-node-script

import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql";
import fs from "fs";
import { printSchema } from "graphql";
import { UserResolver } from "../src/user/user.resolver";

const OUTPUT = "schema.gql";

async function generateSchema(): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([UserResolver]);
  fs.writeFileSync(OUTPUT, printSchema(schema), "utf-8");
}

generateSchema();
