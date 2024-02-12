import { Collection } from "@redlibs/mongo-bundle";
import { Live } from "../../behaviors/live.behavior";

export class PostsCollection extends Collection {
  static collectionName = "posts";

  static behaviors = [Live()];
}
