import { Event } from "@redlibs/core";

export class UISessionInitialisingEvent extends Event<{
  defaults: {
    [key: string]: any;
  };
}> {}
