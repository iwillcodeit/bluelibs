import { Event } from "@redlibs/core";

export class AuthenticationTokenUpdateEvent extends Event<{ token: string }> {}

export class UserLoggedInEvent extends Event<{ token: string }> {}

export class UserLoggedOutEvent extends Event<{
  userId: string | number | object;
}> {}
