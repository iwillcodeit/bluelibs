import "@redlibs/graphql-bundle";
import { ContainerInstance } from "@redlibs/core";
import * as express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";

declare module "@redlibs/graphql-bundle" {
  export interface IGraphQLContext {
    container: ContainerInstance;
    req: express.Request;
    res: express.Response;
    connection?: ExecutionParams;
  }
}
