import * as _ from "lodash";
import { Collection } from "mongodb";
import { IQueryContext, QueryBodyType } from "../defs";
import hypernova from "./hypernova/hypernova";
import CollectionNode, {
  CollectionNodeAggregationOptions,
} from "./nodes/CollectionNode";

export interface QueryOptions extends CollectionNodeAggregationOptions {}

export default class Query<T = any> {
  public collection: Collection<T>;
  private graph: CollectionNode;
  public readonly body: any;
  public queryName: string;

  public readonly options?: QueryOptions;

  /**
   * Everythig starts with a query. We build the graph based on the body.
   *
   * @param collection
   * @param body
   */
  constructor(
    collection: Collection<T>,
    body: QueryBodyType,
    context?: IQueryContext,
    options?: QueryOptions
  ) {
    this.collection = collection;
    this.queryName = collection.collectionName;
    this.body = body;
    this.options = options;
    this.graph = new CollectionNode(
      {
        collection,
        body,
        name: "root",
        options,
      },
      context || {}
    );
  }

  /**
   * Retrieves the data.
   *
   * @param context
   * @returns {*}
   */
  public async fetch(): Promise<any[]> {
    this.graph.forceSingleResult = false;
    return this.toArray();
  }

  public async toArray() {
    return hypernova(this.graph);
  }

  public async fetchOne(): Promise<any> {
    this.graph.forceSingleResult = true;
    const results = await this.toArray();

    return _.first(results);
  }
}
