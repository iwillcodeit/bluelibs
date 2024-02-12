import { Kernel } from "@redlibs/core";
import { XUINextBundle } from "../..";

export function createSampleKernel() {
  return new Kernel({
    bundles: [new XUINextBundle()],
  });
}
