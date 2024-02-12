import { Event } from "@redlibs/core";
import { IRoute } from "@redlibs/x-ui-router";

export class RoutingPreparationEvent extends Event<{
  routes: IRoute[];
}> {
  getRoutes(): IRoute[] {
    return this.data.routes;
  }
}
