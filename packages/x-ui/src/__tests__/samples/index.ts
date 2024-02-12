import { Kernel } from "@redlibs/core";
import { XUIBundle } from "../../XUIBundle";

export function createSampleKernel() {
  return new Kernel({
    bundles: [new XUIBundle()],
  });
}
