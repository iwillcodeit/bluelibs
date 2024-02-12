import { ApolloBundle } from "@redlibs/apollo-bundle";
import { Kernel } from "@redlibs/core";
import { SecurityBundle } from "@redlibs/security-bundle";
import { ApolloSecurityBundle } from "../ApolloSecurityBundle";

export function createKernel() {
  return new Kernel({
    bundles: [
      new ApolloBundle({
        port: 6400,
      }),
      new ApolloSecurityBundle(),
      new SecurityBundle(),
    ],
  });
}
