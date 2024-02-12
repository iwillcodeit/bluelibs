import { Event } from "@redlibs/core";
import { ILog } from "./defs";

export class LogEvent extends Event<{ log: ILog }> {}
