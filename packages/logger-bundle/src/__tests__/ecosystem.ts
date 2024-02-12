import { Kernel } from "@redlibs/core";
import { LoggerBundle } from "../LoggerBundle";

export const createKernel = (): Kernel => {
  return new Kernel({
    bundles: [new LoggerBundle()],
  });
};
