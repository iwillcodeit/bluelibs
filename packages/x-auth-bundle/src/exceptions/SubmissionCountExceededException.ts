import { Exception } from "@redlibs/core";

export class SubmissionCountExceededException extends Exception {
  static code = "SUBMISSION_COUNT_EXCEEDED";

  getMessage() {
    return "the user exceeded the submission count";
  }
}
