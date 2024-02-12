import { IXUII18NBundleConfig } from "@redlibs/x-ui-i18n-bundle";
import { IXUISessionBundleConfigType } from "@redlibs/x-ui-session-bundle";
import { IXUIGuardianBundleConfigType } from "@redlibs/x-ui-guardian-bundle";
import { IUIApolloBundleConfig } from "@redlibs/ui-apollo-bundle";
import { IXUIReactBundleConfigType } from "@redlibs/x-ui-react-bundle";
import { Kernel } from "@redlibs/core";

export type XUINextBundleConfigType = {
  apollo: IUIApolloBundleConfig;
  guardian: IXUIGuardianBundleConfigType;
  sessions: IXUISessionBundleConfigType;
  react: IXUIReactBundleConfigType;
  i18n: IXUII18NBundleConfig;
};

export interface CreateAppProps {
  loadingComponent?: JSX.Element;
  kernel: Kernel;
}
