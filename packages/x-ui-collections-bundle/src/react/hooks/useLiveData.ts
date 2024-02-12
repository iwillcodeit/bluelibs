import { useState, useEffect } from "react";
import { Constructor } from "@redlibs/core";
import { Collection } from "../../graphql/Collection";
import {
  IQueryInput,
  ISubscriptionOptions,
  QueryBodyType,
} from "../../graphql/defs";
import { use } from "@redlibs/x-ui-react-bundle";
import { XSubscription } from "@redlibs/ui-apollo-bundle";

export type UseLiveDataStateType<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

/**
 * Use this to fetch the data in a live fashion
 */
export function useLiveData<T>(
  collectionClass: Constructor<Collection<T>>,
  queryOptions: IQueryInput<T> = {},
  body: QueryBodyType<T>,
  subscriptionOptions: ISubscriptionOptions = {}
): UseLiveDataStateType<T[]> {
  const collection = use(collectionClass);
  const [isReady, setIsReady] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const newBody = Object.assign({}, body);
    newBody.$ = Object.assign({}, newBody.$);
    Object.assign(newBody.$, queryOptions);

    // const body = queryOptions.
    const observable = collection.subscribe(newBody, subscriptionOptions);
    const subscription = new XSubscription(observable, setDataSet, {
      onReady: () => setIsReady(true),
      onError: (err) => setError(err),
      ...subscriptionOptions,
    });
    return () => {
      subscription.stop();
    };
  }, []);

  return {
    data: dataSet,
    isLoading: !isReady,
    error,
  };
}

/**
 * Use this when you are expecting one element, works well with _id
 */
export function useLiveDataOne<T>(
  collectionClass: Constructor<Collection<T>>,
  _id: any,
  body: QueryBodyType<T>,
  options: ISubscriptionOptions = {}
): UseLiveDataStateType<T> {
  const { data, isLoading, error } = useLiveData(
    collectionClass,
    {
      // @ts-ignore
      filters: {
        _id,
      },
    },
    body,
    options
  );

  return {
    data: data.length ? data[0] : null,
    isLoading,
    error,
  };
}
