import { Exception } from "@redlibs/core";

export class UsernameAlreadyExistsException extends Exception {
  getMessage() {
    return "Username already exists";
  }

  getCode() {
    return "USERNAME_ALREADY_EXISTS";
  }
}
