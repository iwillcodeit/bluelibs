import { ApolloClient as BaseApolloClient } from "@apollo/client/core";
import { EventManager, Service } from "@redlibs/core";
import { ContainerInstance } from "@redlibs/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { IUIApolloBundleConfig } from "../defs";
import { createApolloLink } from "./utils/createApolloLink";

@Service()
export class ApolloClient extends BaseApolloClient<any> {
  public subscriptionClient?: SubscriptionClient;

  constructor(container: ContainerInstance, options: IUIApolloBundleConfig) {
    const { finalLink, subscriptionClient } = createApolloLink(
      container.get(EventManager),
      options.client.uri as string,
      {
        subscriptions: options.enableSubscriptions,
      }
    );

    super({
      link: finalLink,
      ...options.client,
    });

    this.subscriptionClient = subscriptionClient;
  }
}
