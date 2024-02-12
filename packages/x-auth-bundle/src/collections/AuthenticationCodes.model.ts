import { ObjectID } from "@redlibs/mongo-bundle";
import { UserId } from "@redlibs/security-bundle";

export class AuthenticationCodes {
  code: string;

  leftSubmissionsCount?: number;

  expiresAt?: string | number | Date;

  userId: UserId;
}
