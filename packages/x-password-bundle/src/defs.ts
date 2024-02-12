import { IReactEmailTemplate } from "@redlibs/email-bundle";
import { IXPasswordService } from "./services/IXPasswordService";
import { Constructor } from "@redlibs/core";
import { IForgotPasswordEmailProps } from "./emails/ForgotPasswordEmail";
import { IWelcomeEmailProps } from "./emails/WelcomeEmail";
import { IResetPasswordConfirmationEmailProps } from "./emails";
import { IVerifyEmailProps } from "./emails/VerifyEmail";
import "@redlibs/security-bundle";
import "@redlibs/password-bundle";
import { IPasswordAuthenticationStrategy } from "@redlibs/password-bundle";

declare module "@redlibs/security-bundle" {
  export interface IUser {
    password: IPasswordAuthenticationStrategy;
    profile: IUserProfile;
  }
  export interface IUserProfile {
    firstName: string;
    lastName: string;
  }
}

export interface IXPasswordBundleConfig {
  services: {
    XPasswordService: Constructor<IXPasswordService>;
  };
  emails: {
    templates: {
      welcome: IReactEmailTemplate<IWelcomeEmailProps>;
      forgotPassword: IReactEmailTemplate<IForgotPasswordEmailProps>;
      resetPasswordConfirmation: IReactEmailTemplate<IResetPasswordConfirmationEmailProps>;
      verifyEmail: IReactEmailTemplate<IVerifyEmailProps>;
    };
    paths: {
      welcomePath: string;
      resetPasswordPath: string;
      verifyEmailPath: string;
    };
    applicationName: string;
    regardsName: string;
    sendEmailVerification: boolean;
    sendWelcomeEmail: boolean;
  };
  requiresEmailVerificationBeforeLoggingIn: boolean;
  graphql: {
    mutations: {
      register: boolean;
      changePassword: boolean;
      login: boolean;
      logout: boolean;
      resetPassword: boolean;
      forgotPassword: boolean;
      verifyEmail: boolean;
    };
    queries: {
      me: boolean;
    };
  };
}
