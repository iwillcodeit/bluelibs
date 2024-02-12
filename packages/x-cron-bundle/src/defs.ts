import { ParseStatic, ScheduleData } from "later";
import { ContainerInstance } from "@redlibs/core";
import { ObjectID } from "@redlibs/mongo-bundle";

export interface ICronConfig {
  name: string;
  schedule: (parser: ParseStatic) => ScheduleData;
  job: (container: ContainerInstance) => void | Promise<void>;
  persist?: boolean;
  _timer?: any;
}

export interface ICronEntry {
  _id?: ObjectID;
  intendedAt: Date;
  name: string;
  startedAt: Date;
  finishedAt?: Date;
  result?: any;
}

export type XCronBundleConfigType = {
  crons?: ICronConfig[];
};

export interface ICronModel {
  intendedAt: Date;
}
