#!/usr/bin/env -S npx ts-node-script

import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql";
import fs from "fs";
import { printSchema } from "graphql";
import { CandidateResolver } from "../src/candidate/candidate.resolver";
import { ElectionResolver } from "../src/election/election.resolver";
import { UserResolver } from "../src/user/user.resolver";

const OUTPUT = "schema.gql";

async function generateSchema(): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    UserResolver,
    ElectionResolver,
    CandidateResolver,
  ]);
  fs.writeFileSync(OUTPUT, printSchema(schema), "utf-8");
}

generateSchema();
