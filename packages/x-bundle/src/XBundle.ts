import { Bundle, Constructor, MissingParameterException } from "@redlibs/core";
import { ValidatorService } from "@redlibs/validator-bundle";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { Loader } from "@redlibs/graphql-bundle";

import { UniqueFieldValidationMethod } from "./validators/UniqueFieldValidationMethod";
import { DateTransformer } from "./validators/DateTransformer";
import CRUDTypes from "./graphql/crud/types";
import scalars from "./graphql/scalars";
import {
  X_SETTINGS,
  X_FRAMEWORK_LOGO,
  RANDOM_GEEKIE_DEV_QUOTES,
  APP_ROUTER,
  ROOT_ROUTER,
  IS_LIVE_DEBUG,
  MESSENGER,
  REDIS_OPTIONS,
  CACHE_CONFIG,
  CACHE_SERVICE_TOKEN,
} from "./constants";
import { IXBundleConfig, IMessenger } from "./defs";
import * as chalk from "chalk";
import { execSync } from "child_process";
import { Router } from "./services/Router";
import { RedisMessenger } from "./services/RedisMessenger";
import { Messenger as LocalMessenger } from "./services/Messenger";
import SubscriptionGraphQLModule from "./graphql/subscriptions.graphql-module";
import { RedisListener } from "./listeners/RedisListener";
import { CacheService } from "./cache/CacheService";
export class XBundle extends Bundle<IXBundleConfig> {
  dependencies = [MongoBundle, LoggerBundle];

  defaultConfig = {
    logo: X_FRAMEWORK_LOGO,
    appUrl: "http://localhost:3000",
    rootUrl: "http://localhost:4000",
    live: {
      debug: false,
    },
    cacheConfig: {
      store: "memory",
      storeConfig: {
        max: 100,
        ttl: 60,
        refreshThreshold: 1,
      },
      resolverDefaultConfig: {
        ttl: 30,
        contextBoundness: true,
        contextBoundnessFields: ["userId"],
        expirationBoundness: true,
        expirationBoundnessField: "expiredAt", //secondsCount or DateTime,
        refresh: false,
      },
    },
  };

  async prepare() {
    this.container.set(X_SETTINGS, this.config);

    const loader = this.container.get(Loader);
    loader.load(SubscriptionGraphQLModule);

    this.container.set(IS_LIVE_DEBUG, this.config.live.debug || false);
    if (this.config.live.redis) {
      this.container.set(REDIS_OPTIONS, this.config.live.redis);
    }

    let messengerType: Constructor<IMessenger>;
    if (this.config.live.messengerClass) {
      messengerType = this.config.live.messengerClass;
    } else {
      // We leave it here as any due to constructor incompatibility in this.container.set()
      messengerType = this.config.live.redis ? RedisMessenger : LocalMessenger;
    }

    this.container.set({
      id: MESSENGER,
      type: messengerType,
    });

    const { appUrl, rootUrl } = this.config;
    if (appUrl) {
      this.container.set(APP_ROUTER, new Router(appUrl));
    }
    if (rootUrl) {
      this.container.set(ROOT_ROUTER, new Router(rootUrl));
    }

    if (this.kernel.isDevelopment() && !this.kernel.isTesting()) {
      this.displayWelcomeMessage();
    }

    this.container.set(CACHE_CONFIG, this.config.cacheConfig);
    this.container.set({ id: CACHE_SERVICE_TOKEN, type: CacheService });
  }

  async init() {
    const validator = this.container.get<ValidatorService>(ValidatorService);
    const loader = this.container.get<Loader>(Loader);

    validator.addMethod(UniqueFieldValidationMethod);
    validator.addTransformer(DateTransformer);

    this.warmup([RedisListener]);

    loader.load([CRUDTypes, ...scalars]);
  }

  public displayWelcomeMessage() {
    console.log(chalk.blueBright(`${this.config.logo}`));
  }

  /**
   * I'm sure you got a little bit worried how this npm package has access to your name.
   * Well.. curiosity brought you here, and I'm happy you are curious about the code you are using.
   */
  protected getFirstName(): string | null {
    try {
      const name = execSync("git config --get user.name").toString();
      return name.split(" ")[0];
    } catch (e) {
      return "Anonymous";
    }
  }
}
