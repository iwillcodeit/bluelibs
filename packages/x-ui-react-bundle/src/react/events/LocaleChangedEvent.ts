import { Event } from "@redlibs/core";

export class LocaleChangedEvent extends Event<{ locale: string }> {}
