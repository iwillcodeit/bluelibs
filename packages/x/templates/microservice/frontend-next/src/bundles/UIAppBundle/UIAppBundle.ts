import { Bundle } from "@redlibs/core";
import { XUINextBundle } from "@redlibs/x-ui-next";
import { AppGuardian } from "./services/AppGuardian";

// import * as ComponentOverrides from "./overrides";

export class UIAppBundle extends Bundle {
  async prepare() {
    const xui = this.container.get(XUINextBundle);

    xui.setGuardianClass(AppGuardian);

    // In case you want to override certain components
    // xui.updateComponents(ComponentOverrides);
  }
}
