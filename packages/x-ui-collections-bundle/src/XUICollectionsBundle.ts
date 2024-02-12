import { Bundle } from "@redlibs/core";
import { UIApolloBundle } from "@redlibs/ui-apollo-bundle";
import { IXUICollectionsBundleConfig } from "./defs";

export class XUICollectionsBundle extends Bundle<IXUICollectionsBundleConfig> {
  protected defaultConfig = {} as IXUICollectionsBundleConfig;

  async extend() {
    await this.addDependency(UIApolloBundle);
  }
}
