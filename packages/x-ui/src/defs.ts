import { IUII18NBundleConfig } from "@redlibs/x-ui-i18n-bundle";
import { IXUISessionBundleConfigType } from "@redlibs/x-ui-session-bundle";
import {
  GuardianSmart,
  IXUIGuardianBundleConfigType,
} from "@redlibs/x-ui-guardian-bundle";
import { IXUIReactBundleConfigType } from "@redlibs/x-ui-react-bundle";
import {
  ApolloClientOptions,
  IUIApolloBundleConfig,
} from "@redlibs/ui-apollo-bundle";
import { Constructor } from "@redlibs/core";

export type XUIBundleConfigType = Partial<{
  /**
   * @deprecated Please use `apollo.client`
   */
  graphql: Partial<ApolloClientOptions<any>>;

  /**
   * @deprecated Please use `guardian.guardianClass`
   */
  guardianClass: Constructor<GuardianSmart>;

  /**
   * @deprecated Please use `apollo.enableSubscriptions`
   */
  enableSubscriptions: boolean;

  apollo: IUIApolloBundleConfig;
  guardian: IXUIGuardianBundleConfigType;
  sessions: IXUISessionBundleConfigType;
  react: IXUIReactBundleConfigType;
  i18n: IUII18NBundleConfig;
}>;
