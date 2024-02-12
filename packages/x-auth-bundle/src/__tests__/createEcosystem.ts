import { Bundle, Kernel } from "@redlibs/core";
import { GraphQLBundle, Loader } from "@redlibs/graphql-bundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { XBundle } from "@redlibs/x-bundle";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { SecurityBundle } from "@redlibs/security-bundle";
import { PasswordBundle } from "@redlibs/password-bundle";
import { HTTPBundle } from "@redlibs/http-bundle";
import { SecurityMongoBundle } from "@redlibs/security-mongo-bundle";
import { XAuthBundle } from "..";
import { EmailBundle } from "@redlibs/email-bundle";

export const PORT = 64022;
export async function createEcosystem(configXAuthBundle = {}) {
  try {
    const kernel = new Kernel({
      bundles: [
        new LoggerBundle(),
        new GraphQLBundle(),
        new EmailBundle(),
        new HTTPBundle({
          port: PORT,
        }),
        new MongoBundle({
          uri: "mongodb://localhost:27017/test",
        }),
        new SecurityMongoBundle(),
        new SecurityBundle(),
        new PasswordBundle(),

        new XAuthBundle(configXAuthBundle),
        new XBundle(),
      ],
      parameters: {
        testing: true,
      },
    });
    await kernel.init();

    return kernel.container;
  } catch (err) {
    throw err;
  }
}
