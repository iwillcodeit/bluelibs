#!/usr/bin/env node

// CLITS
import { Kernel } from "@redlibs/core";
import { TerminalBundle } from "@redlibs/terminal-bundle";
import { XGeneratorBundle } from "./XGeneratorBundle";

const kernel = new Kernel({
  bundles: [
    new TerminalBundle({
      version: require("../package.json").version,
    }),
    new XGeneratorBundle(),
  ],
});

kernel.init().then(() => {
  // exec('npm view @redlibs/x version').
});
