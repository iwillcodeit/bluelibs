import { Exception } from "@redlibs/core";

export class CodeSubmissionExceededException extends Exception {
  getMessage() {
    return "You exceeded max attempts to validate code";
  }
}
