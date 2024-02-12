import { Collection, Behaviors } from "@redlibs/mongo-bundle";
import { AuthenticationCodes } from "./AuthenticationCodes.model";

export class AuthenticationCodesCollection extends Collection<AuthenticationCodes> {
  static collectionName = "AuthenticationCodes";
  static model = AuthenticationCodes;
}
