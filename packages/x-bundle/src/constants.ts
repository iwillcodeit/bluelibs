import { Token } from "@redlibs/core";
import { IMessenger, IXBundleConfig } from "./defs";
import * as chalk from "chalk";
import { Router } from "./services/Router";
import type { ClientOpts } from "redis";
import { ICacheManagerConfig } from "./cache/defs";
import { CacheService } from "./cache/CacheService";

export const MESSENGER = new Token<IMessenger>("MESSENGER");
export const IS_LIVE_DEBUG = new Token<boolean>("IS_LIVE_DEBUG");
export const REDIS_OPTIONS = new Token<ClientOpts>("REDIS_OPTIONS");
export const X_SETTINGS = new Token<IXBundleConfig>();
export const APP_ROUTER = new Token<Router>();
export const ROOT_ROUTER = new Token<Router>();
export const CACHE_CONFIG = new Token<ICacheManagerConfig>();
export const CACHE_SERVICE_TOKEN = new Token<CacheService>();

export const X_FRAMEWORK_LOGO = String.raw`
xxxxxxx      xxxxxxx
 x:::::x    x:::::x 
  x:::::x  x:::::x  
   x:::::xx:::::x   
    x::::::::::x    
     x::::::::x     X-Framework Server by BlueLibs
     x::::::::x     ${chalk.green.bold("You are in control.")}
    x::::::::::x    
   x:::::xx:::::x   
  x:::::x  x:::::x  
 x:::::x    x:::::x 
xxxxxxx      xxxxxxx 
`;

// Look, I know they may be cheesy, but who doesn't love cheese?
// Some ideas to bring some fun into our digital lives.
// Feel free to come up with better ones and submit a PR
export const RANDOM_GEEKIE_DEV_QUOTES = [
  "%name%, you are an intellectual badass.",
  "You are in control, %name%.",
  "True code comes from within, %name%.",
  "%name%. It's time: 🕐",
  "%name%. Stay strong & productive",
  "Always test your code, %name%!",
  "May the code you write be SOLID and DRY.",
  "Code is like poetry. You're a poet, %name%!",
  "%name%, shine on you crazy diamond ✨",
  "All is ✅. It's time to 🎸, %name%!",
];

export enum GraphQLSubscriptionEvent {
  ADDED = "added",
  CHANGED = "changed",
  REMOVED = "removed",
  READY = "ready",
}

export enum DocumentMutationType {
  INSERT = "i",
  UPDATE = "u",
  REMOVE = "r",
}

export enum Strategy {
  DEFAULT = "D",
  DEDICATED_CHANNELS = "DC",
  LIMIT_SORT = "LS",
}
