import { Kernel } from "@redlibs/core";
import { LoggerBundle } from "@redlibs/logger-bundle";
import { RabbitMQBundle } from "../RabbitMQBundle";

export const createKernel = (): Kernel => {
  return new Kernel({
    bundles: [
      new LoggerBundle(),
      new RabbitMQBundle({
        url: "amqp://localhost:5672/",
      }),
    ],
  });
};
