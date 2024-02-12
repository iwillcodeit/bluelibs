import { Token } from "@redlibs/core";
import { IHasherService, IPasswordBundleConfig } from "./defs";

export const BUNDLE_CONFIG_TOKEN = new Token<IPasswordBundleConfig>();
export const HASHER_SERVICE_TOKEN = new Token<IHasherService>();
