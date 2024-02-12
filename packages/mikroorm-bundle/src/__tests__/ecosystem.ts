import { Kernel } from "@redlibs/core";
import { MikroORMBundle } from "../MikroORMBundle";

export const createKernel = (): Kernel => {
  return new Kernel({
    bundles: [
      new MikroORMBundle({
        options: {
          dbName: "test-orm",
          type: "mongo",
          clientUrl: "mongodb://localhost:27017",
        },
      }),
    ],
  });
};
