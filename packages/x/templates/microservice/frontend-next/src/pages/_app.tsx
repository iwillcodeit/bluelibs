import "../styles/globals.css";

import { createApp } from "@redlibs/x-ui-next";
import { kernel } from "../startup/kernel";

export default createApp({
  kernel,
});
