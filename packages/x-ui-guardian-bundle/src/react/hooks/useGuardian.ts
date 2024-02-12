import { use, useContainer, useSmart } from "@redlibs/x-ui-react-bundle";
import { GUARDIAN_SMART_TOKEN } from "../../constants";

import { GuardianSmart } from "../smarts/GuardianSmart";

export const useGuardian = (): GuardianSmart => {
  const guardian = use(GUARDIAN_SMART_TOKEN);

  return useSmart(guardian);
};
