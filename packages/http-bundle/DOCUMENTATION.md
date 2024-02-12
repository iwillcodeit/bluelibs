This is a bundle that integrates nicely with [express](http://expressjs.com/en/api.html#express) within the framework.

## Install

```ts
import { Kernel } from "@redlibs/core";
import { HTTPBundle } from "@redlibs/http-bundle";

const kernel = new Kernel({
  bundles: [
    // ... the rest
    new HTTPBundle({
      port: 5000,
    }),
  ],
});
```

## Purpose

The idea is to bring `express`'simplicity into your application and link it with your container. It also gives you ability to chain handlers so you can perform different re-usable sets of logic and is `async` built from ground-up.

HTTPBundle starts the `listen()` in the `KernelAfterInit` hook. So the application starts listening before `kernel.init()` promise resolves. If there's an error with starting the server like the port is already in use, the `kernel.init()` will fail.

## Usage

The most typical thing you would do is add middlewares and routes. You have access to the `express.Application` directly from the bundle, and an easy way to just add routes:

```ts
class AppBundle extends Bundle {
  async init() {
    const httpBundle = this.container.get(HTTPBundle);

    // You have access to, if you want to perform other configurations to it
    httpBundle.app;
    httpBundle.router;

    // You can add routes in prepare() phase too
    httpBundle.addRoute({
      type: "get",
      path: "/users/:userId",
      async handler(container, req, res, next) {
        // Query the users from the database service you get via container
        res.json({
          user: {},
        });
      },
    });
  }
}
```

A good idea is to separate your routes:

```ts title="routes.ts"
import { RouteType } from "@redlibs/http-bundle";

export const routes: RouteType[] = [
  {
    type: "get",
    path: "/users",
    async handler(container, req, res, next) {
      // do your thing
    },
  },
];
```

Handlers can be chainable:

```ts
async function CheckLoggedIn(container, req, res, next) {
  // throw exception if not ok
}

export const routes: RouteType[] = [
  {
    type: "get",
    path: "/users",
    handler: [
      CheckLoggedIn(),
      async (container, req, res, next) => {
        // something else
      },
    ],
  },
];
```

Now you can better add them without poluting bundle code:

```ts
httpBundle.addRoutes(routes);
```

## Middlewares

Adding express middlewares should be done in `prepare()` phase of your bundle. By default the middlewares we add are:

- cookieParser
- json
- urlencoded({ extended: true })
- express router (stored in .router)

Currently you cannot opt-out of them, feel free to fork the `HTTPBundle` and add it to your repo if you want full customisations.

```ts
class AppBundle extends Bundle {
  async prepare() {
    const httpBundle = this.container.get(HTTPBundle);
    const { app } = httpBundle;

    app.use(/* your middleware */);
  }
}
```

## Events

You have two specialized events at your disposal:

```ts
import {
  HTTPServerBeforeInitialisationEvent,
  HTTPServerInitialisedEvent,
} from "@redlibs/http-bundle";

// HTTPServerBeforeInitialisationEvent : before starting to listen()
// HTTPServerInitialisedEvent : after listen() has started successfully
```

## Express Access

After `HTTPBundle` finishes preparation you already have an `app` property which the express instance:

```tsx
// Do custom things with express
const app = container.get(HTTPBundle).app;

// Routes are added on the default router, which you can change
const router = container.get(HTTPBundle).router;
```

## Meta

### Summary

Here we have it, a pure HTTP solution inside the BlueLibs ecosystem.

### Challenges

- Create a JWT authentication middleware with HTTPBundle (3p)
- Create a route which takes `city` and `country` as query params and returns the weather for today `/weather?city=New York&country=USA` via a dedicated `WeatherService` (2p)

### Boilerplates

- [HTTP Server](https://stackblitz.com/edit/node-nbieti?file=src%2Fhttp%2FAppBundle.ts)
