import { Kernel } from "@redlibs/core";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { HTTPBundle } from "../HTTPBundle";

export const createKernel = (): Kernel => {
  return new Kernel({
    bundles: [
      new LoggerBundle(),
      new HTTPBundle({
        port: 6000,
      }),
    ],
  });
};
