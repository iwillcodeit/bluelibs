import { Service } from "@redlibs/core";
import { Smart as BaseSmart, smart, newSmart, useSmart } from "@redlibs/smart";

@Service({
  transient: true,
})
export class Smart<S, C> extends BaseSmart<S, C> {}

export { smart, newSmart, useSmart };
