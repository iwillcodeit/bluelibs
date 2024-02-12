import { Event } from "@redlibs/core";
import { AppFile } from "../collections/appFiles/AppFile.model";

export class BeforeFileUploadEvent extends Event<{
  filename: string;
  mimetype: string;
  buffer: Buffer;
  extension?: Partial<AppFile>;
}> {}
