#!/usr/bin/env node
import { TerminalBundle } from "./TerminalBundle";
import { Kernel } from "@redlibs/core";

const kernel = new Kernel({
  bundles: [
    new TerminalBundle({
      // Unsure
      commands: [],
    }),
  ],
});

kernel.init();
