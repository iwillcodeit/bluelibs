import {
  IExpanderOptions,
  ILinkOptions,
  IQueryContext,
  IReducerOption,
  IReducerOptions,
  QueryBodyType,
} from "./defs";

import * as _ from "lodash";
import { Collection } from "mongodb";
import {
  EXPANDER_STORAGE,
  LINK_COLLECTION_OPTIONS_DEFAULTS,
  LINK_STORAGE,
  REDUCER_STORAGE,
} from "./constants";
import { ISecureOptions } from "./defs";
import astToQuery, { secureBody } from "./graphql/astToQuery";
import Linker, { IGetLookupOperatorOptions } from "./query/Linker";
import Query, { QueryOptions } from "./query/Query";

export { Linker, secureBody };

export function query<T>(
  collection: Collection<T>,
  body: QueryBodyType,
  context?: IQueryContext,
  options?: QueryOptions
) {
  return new Query(collection, body, context, options);
}

query.securely = function securely<T = any>(
  config: ISecureOptions,
  collection: Collection<T>,
  body: QueryBodyType,
  context?: IQueryContext,
  options?: QueryOptions
) {
  return query(collection, secureBody(body, config), context, options);
};

query.graphql = function graphql<T = any>(
  collection: Collection<T>,
  ast: any,
  config: ISecureOptions,
  context?: IQueryContext,
  options?: QueryOptions
) {
  return astToQuery(collection, ast, config, context, options);
};

export function clear(collection: Collection<any>) {
  collection[LINK_STORAGE] = {};
  collection[REDUCER_STORAGE] = {};
  collection[EXPANDER_STORAGE] = {};
}

export function addLinks<T = any>(
  collection: Collection<T>,
  data: ILinkOptions
) {
  if (!collection[LINK_STORAGE]) {
    collection[LINK_STORAGE] = {};
  }

  _.forEach(data, (linkConfig, linkName) => {
    if (collection[LINK_STORAGE][linkName]) {
      throw new Error(
        `You cannot add the link with name: ${linkName} because it was already added to ${this.collectionName} collection`
      );
    }

    const linker = new Linker(collection, linkName, {
      ...LINK_COLLECTION_OPTIONS_DEFAULTS,
      ...linkConfig,
    });

    Object.assign(collection[LINK_STORAGE], {
      [linkName]: linker,
    });
  });
}

export function addExpanders<T = any>(
  collection: Collection<T>,
  data: IExpanderOptions
) {
  if (!collection[EXPANDER_STORAGE]) {
    collection[EXPANDER_STORAGE] = {};
  }

  _.forEach(data, (expanderConfig, expanderName) => {
    if (collection[EXPANDER_STORAGE][expanderName]) {
      throw new Error(`This expander was already added.`);
    }

    Object.assign(collection[EXPANDER_STORAGE], {
      [expanderName]: expanderConfig,
    });
  });
}

export function getLinker<T = any>(
  collection: Collection<T>,
  name: string
): Linker {
  if (collection[LINK_STORAGE] && collection[LINK_STORAGE][name]) {
    return collection[LINK_STORAGE][name];
  } else {
    throw new Error(
      `Link "${name}" is not found in collection: "${collection.collectionName}"`
    );
  }
}

export function hasLinker<T = any>(
  collection: Collection<T>,
  name: string
): boolean {
  if (collection[LINK_STORAGE]) {
    return Boolean(collection[LINK_STORAGE][name]);
  } else {
    return false;
  }
}

/**
 * This returns the correct aggregation pipeline operator
 * This is useful for complex searching and filtering
 */
export function lookup(
  collection: Collection<any>,
  linkName: string,
  options?: IGetLookupOperatorOptions
) {
  return getLinker(collection, linkName).getLookupAggregationPipeline(options);
}

export function getReducerConfig(
  collection: Collection<any>,
  name: string
): IReducerOption {
  if (collection[REDUCER_STORAGE]) {
    return collection[REDUCER_STORAGE][name];
  }
}

export function getExpanderConfig(
  collection: Collection<any>,
  name: string
): QueryBodyType {
  if (collection[EXPANDER_STORAGE]) {
    return collection[EXPANDER_STORAGE][name];
  }
}

export function addReducers<T = any>(
  collection: Collection<T>,
  data: IReducerOptions
) {
  if (!collection[REDUCER_STORAGE]) {
    collection[REDUCER_STORAGE] = {};
  }

  Object.keys(data).forEach((reducerName) => {
    const reducerConfig = data[reducerName];

    if (hasLinker(collection, reducerName)) {
      throw new Error(
        `You cannot add the reducer with name: ${reducerName} because it is already defined as a link in ${collection.collectionName} collection`
      );
    }

    if (collection[REDUCER_STORAGE][reducerName]) {
      throw new Error(
        `You cannot add the reducer with name: ${reducerName} because it was already added to ${collection.collectionName} collection`
      );
    }

    Object.assign(collection[REDUCER_STORAGE], {
      [reducerName]: reducerConfig,
    });
  });
}

export type CollectionDecorations<T> = {
  query: (body: QueryBodyType<T>, context?: IQueryContext) => Query<T>;
  addLinks: (data: ILinkOptions) => void;
  addReducers: (data: IReducerOptions) => void;
  addExpanders: (data: IExpanderOptions) => void;
  querySecurely: (
    config: ISecureOptions<T>,
    body: QueryBodyType<T>,
    context?: IQueryContext
  ) => Query<T>;
  /**
   * Used for transforming a GraphQL AST into a Nova Query
   * @param ast
   * @param options
   * @param context
   * @returns
   */
  queryFromAST: (
    ast: any,
    options: ISecureOptions,
    context?: IQueryContext
  ) => Query<T>;
};

/**
 * This is used to enhance a mongodb collection with the query function.
 * @param collection
 * @returns
 */
export function decorate<TEnhanced, TCModel>(
  collection: Collection<TCModel>
): Collection<TCModel> & CollectionDecorations<TEnhanced> {
  Object.assign(collection, {
    query: (body: QueryBodyType<TEnhanced>, context?: IQueryContext) =>
      new Query(collection, body, context),
    addLinks: (data: ILinkOptions) => addLinks(collection, data),
    addReducers: (data: IReducerOptions) => addReducers(collection, data),
    addExpanders: (data: IExpanderOptions) => addExpanders(collection, data),
    querySecurely: (
      config: ISecureOptions<TEnhanced>,
      body: QueryBodyType<TEnhanced>,
      context?: IQueryContext
    ) => query(collection, secureBody(body, config), context),
    queryFromAST: (
      ast: any,
      options: ISecureOptions,
      context?: IQueryContext
    ) => astToQuery(collection, ast, options, context),
  });

  return collection as Collection<TCModel> & CollectionDecorations<TEnhanced>;
}
