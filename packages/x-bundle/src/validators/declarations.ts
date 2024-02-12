import "@redlibs/validator-bundle";
import { IUniqueFieldValidationConfig } from "./UniqueFieldValidationMethod";
import { ObjectIdSchema } from "./ObjectId.validator";
import "./ObjectId.validator";

declare module "yup" {
  export interface DateSchema {
    format(format?: string): DateSchema;
  }

  export interface StringSchema {
    /**
     * Specify a unique constraint for this field
     */
    uniqueField(config?: IUniqueFieldValidationConfig): StringSchema;
  }

  export interface NumberSchema {
    /**
     * Specify a unique constraint for this field
     */
    uniqueField(config?: IUniqueFieldValidationConfig): NumberSchema;
  }

  export type ObjectIdSchemaConstructor = {
    new (...args: any[]): ObjectIdSchema;
  };

  export const objectId: () => ObjectIdSchema;
}
