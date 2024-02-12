import { ApolloBundle } from "@redlibs/apollo-bundle";
import { Bundle, Kernel } from "@redlibs/core";
import { GraphQLBundle, Loader } from "@redlibs/graphql-bundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { XS3Bundle } from "../XS3Bundle";
import { XBundle } from "@redlibs/x-bundle";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { SecurityBundle } from "@redlibs/security-bundle";

class MyBundle extends Bundle {
  async prepare() {
    this.container.get(Loader).load({
      typeDefs: `
        type User { name: String! }
      `,
    });
  }
}
export function createKernel() {
  return new Kernel({
    bundles: [
      new ApolloBundle({
        port: 5022,
      }),
      new GraphQLBundle(),
      new LoggerBundle(),
      new SecurityBundle(),
      new MongoBundle({
        uri: "mongodb://localhost:27017/test",
      }),
      new XBundle(),
      new XS3Bundle({
        s3: {
          accessKeyId: "A",
          secretAccessKey: "B",
          bucket: "test.com",
          endpoint: "https://s3.amazonaws.com/test.com",
          region: "eu-west-2",
        },
      }),
      new MyBundle(),
    ],
  });
}
