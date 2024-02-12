import { Kernel } from "@redlibs/core";
import { XUISessionBundle } from "../..";
import { sessionsConfig } from "../ecosystem";

export function createSampleKernel() {
  return new Kernel({
    bundles: [new XUISessionBundle(sessionsConfig)],
  });
}
