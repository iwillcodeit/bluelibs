import { Collection, Behaviors } from "@redlibs/mongo-bundle";
import * as reducers from "./AppFiles.reducers";
import * as links from "./AppFiles.links";
import { AppFile } from "./AppFile.model";
import { IExpanderOptions } from "@redlibs/nova";

export class AppFilesCollection extends Collection<AppFile> {
  static collectionName = "appFiles";
  static model = AppFile;

  static reducers = reducers;
  static links = links;

  static behaviors = [Behaviors.Timestampable()];

  // Ensuring thumbs are always requested with _id present.
  static expanders = {
    thumbs: {
      thumbs: {
        id: 1,
      },
    },
  };
}
