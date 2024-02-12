import { Bundle } from "@redlibs/core";
import { XS3BundleConfigType } from "./defs";
import { S3UploadService } from "./services/S3UploadService";
import { GraphQLBundle, Loader } from "@redlibs/graphql-bundle";
import GraphQLAppFile from "./graphql/entities/AppFile.graphql";
import GraphQLAppFileResolvers from "./graphql/entities/AppFile.resolvers";
import GraphQLAppFileGroup from "./graphql/entities/AppFileGroup.graphql";
import { AppFileListener } from "./listeners/AppFileListener";
import {
  APP_FILES_COLLECTION_TOKEN,
  X_S3_CONFIG_TOKEN as X_S3_CONFIG_TOKEN,
  APP_FILE_GROUPS_COLLECTION_TOKEN,
} from "./constants";
import { ApolloBundle } from "@redlibs/apollo-bundle";
import { AppFilesCollection } from "./collections/appFiles/AppFiles.collection";
import { AppFileGroupsCollection } from "./collections/appFileGroups/AppFileGroups.collection";

export class XS3Bundle extends Bundle<XS3BundleConfigType> {
  dependencies = [ApolloBundle, GraphQLBundle];

  defaultConfig = {
    accessKeyId: "",
    secretAccessKey: "",
    endpoint: "",
    region: "",
    bucket: "",
    optimizeImages: true,
    thumbs: [
      {
        id: "small",
        width: 128,
        height: 128,
      },
      {
        id: "medium",
        width: 256,
        height: 256,
      },
      {
        id: "large",
        width: 512,
        height: 512,
      },
    ],
  };

  async prepare() {
    this.container.set(X_S3_CONFIG_TOKEN, this.config);
    this.container.set({
      id: APP_FILES_COLLECTION_TOKEN,
      type: this.config.appFilesCollection || AppFilesCollection,
    });
    this.container.set({
      id: APP_FILE_GROUPS_COLLECTION_TOKEN,
      type: this.config.appFileGroupsCollection || AppFileGroupsCollection,
    });
  }

  async init() {
    const loader = this.container.get(Loader);
    loader.load({
      typeDefs: [GraphQLAppFile, GraphQLAppFileGroup],
      resolvers: [GraphQLAppFileResolvers],
    });

    this.warmup([AppFileListener, S3UploadService]);
  }
}
