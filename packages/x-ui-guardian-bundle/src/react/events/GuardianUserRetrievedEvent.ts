import { Event } from "@redlibs/core";
import { GuardianUserType } from "../smarts/GuardianSmart";

export class GuardianUserRetrievedEvent<
  TUserType = GuardianUserType
> extends Event<{
  user: Partial<TUserType>;
}> {}
