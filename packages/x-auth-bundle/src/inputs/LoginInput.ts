import { Schema, Is, a } from "@redlibs/validator-bundle";

@Schema()
export class LoginInput {
  @Is(a.string().required())
  username: string;

  @Is(a.string().required())
  password: string;
}
