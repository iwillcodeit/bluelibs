import * as X from "@redlibs/x-bundle";
import { RegistrationInput } from "../inputs/RegistrationInput";
import { LoginInput } from "../inputs/LoginInput";
import { ResetPasswordInput } from "../inputs/ResetPasswordInput";
import { ForgotPasswordInput } from "../inputs/ForgotPasswordInput";
import { VerifyEmailInput } from "../inputs/VerifyEmailInput";
import { XAuthService } from "../services/XAuthService";
import { ChangePasswordInput } from "../inputs/ChangePasswordInput";
import { IXAuthBundleConfig } from "../defs";
import { IFunctionMap } from "@redlibs/graphql-bundle";
import { ContainerInstance } from "@redlibs/core";
import {
  UsersCollection,
  USERS_COLLECTION_TOKEN,
} from "@redlibs/security-mongo-bundle";

export default (config: IXAuthBundleConfig) => {
  const {
    graphql: { queries },
  } = config;

  const resolvers: IFunctionMap = {};

  if (queries.me) {
    resolvers.me = [
      X.CheckLoggedIn(),
      (_, args, context, ast) => {
        const userId = (context as any).userId;
        const container = context.container as ContainerInstance;

        const usersCollection = container.get<UsersCollection<any>>(
          USERS_COLLECTION_TOKEN
        );

        return usersCollection.queryOneGraphQL(ast, {
          filters: {
            _id: userId,
          },
          intersect: {
            _id: 1,
            email: 1,
            fullName: 1,
            roles: 1,
            profile: 1,
          },
        });
      },
    ];
  }

  return {
    Query: resolvers,
  };
};
