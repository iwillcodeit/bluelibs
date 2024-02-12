// Create a kernel with a bundle

import { Kernel, ContainerInstance } from "@redlibs/core";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { ApolloBundle } from "@redlibs/apollo-bundle";
import { XBundle } from "../../XBundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { ValidatorBundle } from "@redlibs/validator-bundle";

export function createKernel(): Kernel {
  return new Kernel({
    bundles: [
      new LoggerBundle(),
      new MongoBundle({
        uri: "mongodb://localhost:27017/tests",
      }),
      new ValidatorBundle(),
      new XBundle(),
    ],
    parameters: {
      testing: true,
    },
  });
}
