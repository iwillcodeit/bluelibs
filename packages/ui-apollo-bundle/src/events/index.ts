import { GraphQLRequest } from "@apollo/client/link/core";
import { Event } from "@redlibs/core";
import { ConnectionParams } from "subscriptions-transport-ws";

export class ApolloBeforeOperationEvent extends Event<{
  context: {
    [key: string]: any;
  };
  operation: GraphQLRequest;
}> {}

export class ApolloSubscriptionOnConnectionParamsSetEvent extends Event<{
  params: ConnectionParams;
}> {}
