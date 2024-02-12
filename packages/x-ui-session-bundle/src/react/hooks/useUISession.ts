import { use } from "@redlibs/x-ui-react-bundle";
import { UISessionService } from "..";

export const useUISession = () => {
  return use(UISessionService);
};
