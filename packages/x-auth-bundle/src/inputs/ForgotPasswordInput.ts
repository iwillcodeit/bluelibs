import { Schema, Is, a } from "@redlibs/validator-bundle";

@Schema()
export class ForgotPasswordInput {
  @Is(a.string().required())
  email: string;
}
