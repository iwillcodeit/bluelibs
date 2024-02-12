import { IReactEmailTemplate } from "@redlibs/email-bundle";
import { IXAuthService } from "./services/IXAuthService";
import { Constructor } from "@redlibs/core";
import { IForgotPasswordEmailProps } from "./emails/ForgotPasswordEmail";
import { IWelcomeEmailProps } from "./emails/WelcomeEmail";
import { IResetPasswordConfirmationEmailProps } from "./emails";
import { IVerifyEmailProps } from "./emails/VerifyEmail";
import "@redlibs/security-bundle";
import "@redlibs/password-bundle";
import { IPasswordAuthenticationStrategy } from "@redlibs/password-bundle";
import { IRequestMagicLinkProps } from "./emails/RequestMagicLink";
import {
  socialArrayPropsTypes as SocialArrayPropsTypes,
  socialCustomConfigMapType as SocialCustomConfigMapType,
  socialPropsTypes as SocialPropsTypes,
  SocialServiceConfigType,
  SOCIAL_LOGIN_TYPE,
} from "./social-passport/defs";
import { SocialLoginService } from "./social-passport/SocialLoginService";
import { UserId } from "@redlibs/security-bundle";
import { MultipleFactorService } from "./multipleAuthFactor/MultipleFactorService";
import { IMultipleFactorService } from "./multipleAuthFactor/IMultipleFactorService";

declare module "@redlibs/security-bundle" {
  export interface IUser {
    password: IPasswordAuthenticationStrategy;
    profile: IUserProfile;
    socialAccounts?: { service: string; id: string }[];
  }
  export interface ISessionData {
    factors: { strategy: string; redirectUrl: string }[];
  }
  export interface IUserProfile {
    firstName: string;
    lastName: string;
  }
}

export interface IXAuthBundleConfig {
  services: {
    XAuthService: Constructor<IXAuthService>;
    SocialLoginService: Constructor<SocialLoginService>;
    MultipleFactorService: Constructor<IMultipleFactorService>;
  };
  emails: {
    templates: {
      welcome: IReactEmailTemplate<IWelcomeEmailProps>;
      forgotPassword: IReactEmailTemplate<IForgotPasswordEmailProps>;
      resetPasswordConfirmation: IReactEmailTemplate<IResetPasswordConfirmationEmailProps>;
      verifyEmail: IReactEmailTemplate<IVerifyEmailProps>;
      requestMagicLink?: IReactEmailTemplate<IRequestMagicLinkProps>;
    };
    paths: {
      welcomePath: string;
      resetPasswordPath: string;
      verifyEmailPath: string;
      submitMagicCode?: string;
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
      requestLoginLink: boolean;
      verifyMagicCode: boolean;
    };
    queries: {
      me: boolean;
    };
  };
  rest?: {
    register?: boolean;
    changePassword?: boolean;
    login?: boolean;
    logout?: boolean;
    resetPassword?: boolean;
    forgotPassword?: boolean;
    verifyEmail?: boolean;
    requestLoginLink?: boolean;
    verifyMagicCode?: boolean;
    me?: boolean;
  };
  socialAuth?: {
    services?: {
      [key: SOCIAL_LOGIN_TYPE]: SocialServiceConfigType;
    };
    onSocialAuth?: (
      req,
      type,
      uniqueProperty,
      accessToken,
      refreshToken,
      profile,
      done
    ) => any;
    url: string;
    socialUniqueIds?: SocialPropsTypes;
    strategyNameMap?: SocialPropsTypes;
    socialCustomConfig?: SocialCustomConfigMapType;
    importStrategyMap?: {
      [key: string]: any;
    };
    fieldsValues?: SocialArrayPropsTypes;
    profileObjectPath?: SocialArrayPropsTypes;
  };

  multipleFactorAuth?: {
    factors: { strategy: string; redirectUrl: string }[];
    userHaveToMultipleFactorAuth?: (userId: UserId) => Promise<boolean>;
  };

  magicCodeLifeDuration?: string;
  magicAuthFormat?: "token" | "code" | "qrCode";
  leftSubmissionsCount?: number;
}
