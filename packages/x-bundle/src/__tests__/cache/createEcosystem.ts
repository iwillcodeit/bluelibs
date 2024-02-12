// Create a kernel with a bundle

import { Kernel, ContainerInstance } from "@redlibs/core";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { ApolloBundle } from "@redlibs/apollo-bundle";
import { ApolloSecurityBundle } from "@redlibs/apollo-security-bundle";
import { XBundle } from "./../../XBundle";
import { LoggerBundle } from "@redlibs/logger-bundle";

import { SecurityBundle } from "@redlibs/security-bundle";
import { SecurityMongoBundle } from "@redlibs/security-mongo-bundle";
import { PasswordBundle } from "@redlibs/password-bundle";

import { GraphQLBundle } from "@redlibs/graphql-bundle";
export const PORT = 6400;

export async function createEcosystem(): Promise<ContainerInstance> {
  const kernel = new Kernel({
    bundles: [
      new LoggerBundle({
        console: false,
      }),
      new MongoBundle({
        uri: "mongodb://localhost:27017/tests",
      }),
      new PasswordBundle(),
      new GraphQLBundle(),
      new SecurityBundle(),
      new SecurityMongoBundle(),
      new XBundle(),
      new ApolloBundle({
        port: PORT,
      }),
      new ApolloSecurityBundle(),
    ],
    parameters: {
      testing: true,
    },
  });

  await kernel.init();

  return kernel.container;
}
