import { Kernel } from "@redlibs/core";
import { ApolloBundle } from "@redlibs/apollo-bundle";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { SecurityBundle } from "@redlibs/security-bundle";
import { SecurityMongoBundle } from "@redlibs/security-mongo-bundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { XBundle } from "@redlibs/x-bundle";
import { ApolloSecurityBundle } from "@redlibs/apollo-security-bundle";
import { PasswordBundle } from "@redlibs/password-bundle";
import { XAuthBundle } from "@redlibs/x-auth-bundle";
import { GraphQLBundle } from "@redlibs/graphql-bundle";
import { EmailBundle } from "@redlibs/email-bundle";
import { ValidatorBundle } from "@redlibs/validator-bundle";
{{# if hasUploads }}
  import { XS3Bundle } from "@redlibs/x-s3-bundle";
{{/ if }}
{{# if hasUsers }}
  import { UsersCollection } from "../bundles/AppBundle/collections";
{{/ if }}

import env from "./env";

export const kernel = new Kernel({
  parameters: {
    context: env.CONTEXT,
    debug: false,
    testing: process.env.NODE_ENV === "test",
  },
  bundles: [
    new LoggerBundle(),
    new ValidatorBundle(),
    new GraphQLBundle(),
    new ApolloBundle({
      port: env.ROOT_PORT,
      url: env.ROOT_URL,
      enableSubscriptions: true,
    }),
    new MongoBundle({
      uri: env.MONGO_URL,
    }),
    new SecurityBundle(),
    new SecurityMongoBundle({
      {{# if hasUsers }}
        usersCollection: UsersCollection
      {{/ if }}
    }),
    new ApolloSecurityBundle(),
    new XBundle({
      appUrl: env.APP_URL,
      rootUrl: env.ROOT_URL,
    }),
    new EmailBundle(),
    new PasswordBundle(),
    new XAuthBundle(),
    {{# if hasUploads }}
      new XS3Bundle({
        s3: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
          bucket: env.AWS_BUCKET,
          region: env.AWS_REGION,
          endpoint: env.AWS_ENDPOINT,
        },
      }),
    {{/ if }}
  ],
});
