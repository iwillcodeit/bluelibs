import {
  IRoute as IBaseRoute,
  IRouteParams,
} from "@redlibs/x-ui-react-router-bundle";
/**
 * We use `IRoute` here for compatibility reasons
 */
export interface IRoute<T = IRouteParams, Q = IRouteParams>
  extends IBaseRoute<T, Q> {}

/**
 * The code below is designed to offer backwards compatibility
 * We recommend that interface extension should be done on `@redlibs/x-ui-react-bundle` and not here
 */
import {
  IComponents as IBaseComponents,
  useUIComponents as useBaseUIComponents,
} from "@redlibs/x-ui-react-bundle";

export interface IComponents extends IBaseComponents {}

export function useUIComponents(): IComponents {
  return useBaseUIComponents();
}
