import { Token } from "@redlibs/core";
import {
  Connection,
  IDatabaseDriver,
  MikroORM,
  Options,
} from "@mikro-orm/core";

export type MikroORMBundleConfigType = {
  options: Options;
};

export const ORM = new Token<MikroORM<IDatabaseDriver<Connection>>>(
  "MIKRO_ORM_TOKEN"
);
