import { SPECIAL_PARAM_FIELD } from "../../constants";
import { IQueryContext, IReducerOption, QueryBodyType } from "../../defs";
import { INode } from "./INode";

interface ReducerNodeOptions extends IReducerOption {
  body: QueryBodyType;
}

export default class ReducerNode implements INode {
  public name: string;
  public props: any;
  public isSpread: boolean = false;

  public reduceFunction?: any;
  public pipeline: any[];
  public projection: any;

  // This refers to the graph dependency
  public dependency: QueryBodyType;

  // This is a list of reducer nodes this uses
  public dependencies: ReducerNode[] = [];

  public scheduledForDeletion: boolean = false;

  constructor(
    name,
    options: ReducerNodeOptions,
    public readonly context?: IQueryContext
  ) {
    this.name = name;
    this.reduceFunction = options.reduce;
    if (typeof options.dependency === "function") {
      this.dependency = options.dependency.call(this, this.params);
    } else {
      this.dependency = options.dependency;
    }

    if (typeof options.pipeline === "function") {
      this.pipeline = options.pipeline.call(this, this.params);
    } else {
      this.pipeline = options.pipeline || [];
    }

    if (typeof options.projection === "function") {
      this.projection = options.projection.call(this, this.params);
    } else {
      this.projection = options.projection || {};
    }

    if (!options.projection && !this.reduceFunction) {
      // Projection will be the reducer name
      this.projection = { [name]: 1 };
    }

    this.props = options.body[SPECIAL_PARAM_FIELD] || {};
  }

  get params() {
    return {
      ...this.props,
      context: this.context,
    };
  }

  /**
   * When computing we also pass the parameters
   *
   * @param {*} object
   * @param {*} args
   */
  public async compute(object) {
    if (!this.reduceFunction) {
      return;
    }

    object[this.name] = await this.reduce.call(this, object, this.params);
  }

  /**
   * The actual reduce function call
   *
   * @param object
   * @param args
   */
  public async reduce(object, ...args) {
    return this.reduceFunction.call(this, object, ...args);
  }

  /**
   * Adapts the final projection
   * @param projection
   */
  public blendInProjection(projection) {
    if (this.projection) {
      Object.assign(projection, this.projection);
    }
  }

  get hasPipeline() {
    return this.pipeline && this.pipeline.length > 0;
  }
}
