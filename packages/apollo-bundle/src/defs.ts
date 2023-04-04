import * as express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import { ContainerInstance } from "@bluelibs/core";
import { UploadOptions } from "graphql-upload/GraphQLUpload.mjs";
import { RequestHandler } from "express";
import { ApolloServerOptions } from "@apollo/server";

export type ApolloBundleConfigType = {
  port?: number;
  url?: string;
  apollo?: ApolloServerOptions<any>;
  enableSubscriptions?: boolean;
  middlewares?: RequestHandler[];
  routes?: IRouteType[];
  uploads?: false | UploadOptions;
  /**
   * Enable JIT JSON encoding and DECODING through GraphQL
   */
  jit?: boolean;
  useJSONMiddleware?: boolean;
  //serverless
  serverless?: boolean;
};

export interface IRouteType {
  type: "post" | "get" | "put" | "all";
  path: string;
  handler: (
    container: ContainerInstance,
    req: express.Request,
    res: express.Response,
    next: any
  ) => Promise<any>;
}

export interface IGraphQLContext {
  req: express.Request;
  res: express.Response;
  connection?: ExecutionParams;
  container: ContainerInstance;
  /**
   * Connection Parameters from Websocket
   */
  connectionParams: {
    [key: string]: any;
  };
}
