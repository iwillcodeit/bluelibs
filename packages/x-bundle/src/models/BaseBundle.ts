import {
  Bundle as CoreBundle,
  BundleAfterInitEvent,
  Constructor,
  EventManager,
  KernelAfterInitEvent,
  Listener,
} from "@redlibs/core";
import { ILoadOptions, Loader } from "@redlibs/graphql-bundle";
import { Collection, MongoBundle } from "@redlibs/mongo-bundle";
import {
  ValidatorService,
  ValidatorBundle,
  IValidationMethod,
} from "@redlibs/validator-bundle";

export abstract class BaseBundle<T = any> extends CoreBundle<T> {
  async setupBundle(config: {
    collections?: Record<string, any | Constructor<Collection>>;
    listeners?: Record<string, any | Constructor<Listener>>;
    validators?: Record<string, any | Constructor<IValidationMethod<any>>>;
    fixtures?: Record<string, any>;
    graphqlModule?: any | ILoadOptions | ILoadOptions[];
  }) {
    const { collections, listeners, validators, graphqlModule, fixtures } =
      config;
    const eventManager = this.container.get(EventManager);

    // Warming up forces instantiation and initialisastion of classes
    if (collections) {
      eventManager.addListener(BundleAfterInitEvent, (e) => {
        if (e.data.bundle instanceof MongoBundle) {
          this.warmup(
            Object.values(collections).filter(
              (v) => Boolean(v) && v instanceof Collection
            )
          );
        }
        if (e.data.bundle instanceof ValidatorBundle) {
          // Adding validators
          if (validators) {
            const validator =
              this.container.get<ValidatorService>(ValidatorService);
            Object.values(validators)
              .filter((v) => Boolean(v))
              .forEach((validatorClass) => validator.addMethod(validatorClass));
          }
        }
      });
    }

    if (listeners) {
      this.warmup(Object.values(listeners).filter((v) => Boolean(v)));
    }

    if (fixtures) {
      eventManager.addListener(KernelAfterInitEvent, () => {
        this.warmup(Object.values(fixtures).filter((v) => Boolean(v)));
      });
    }

    if (graphqlModule) {
      const loader = this.container.get<Loader>(Loader);
      loader.load(graphqlModule);
    }
  }
}
