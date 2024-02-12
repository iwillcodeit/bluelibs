// Create a kernel with a bundle

import { Kernel, ContainerInstance } from "@redlibs/core";
import { MongoBundle } from "@redlibs/mongo-bundle";
import { ApolloBundle } from "@redlibs/apollo-bundle";
import { ApolloSecurityBundle } from "@redlibs/apollo-security-bundle";
import { XBundle } from "../../../XBundle";
import { LoggerBundle } from "@redlibs/logger-bundle";
import typeDefs from "./types.graphql";
import resolvers from "./resolvers";
import { BaseBundle } from "../../../models/BaseBundle";
import {
  SecurityBundle,
  SecurityService,
  UserId,
} from "@redlibs/security-bundle";
import {
  SecurityMongoBundle,
  UsersCollection,
} from "@redlibs/security-mongo-bundle";
import { PasswordBundle, PasswordService } from "@redlibs/password-bundle";
import { PostsCollection } from "./collections";

import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { GraphQLBundle } from "@redlibs/graphql-bundle";

class AppBundle extends BaseBundle {
  async prepare() {
    this.setupBundle({
      collections: {
        posts: PostsCollection,
      },
      graphqlModule: {
        typeDefs,
        resolvers,
      },
    });
  }

  async init() {
    const securityService = this.container.get(SecurityService);
    const passwordService = this.container.get(PasswordService);

    const usersCollection = this.container.get(UsersCollection);
    await usersCollection.deleteMany({});

    const adminId = await securityService.createUser({
      roles: ["ADMIN"],
    });
    const projectManagerId = await securityService.createUser({
      roles: ["PROJECT_MANAGER"],
    });
    const userId = await securityService.createUser({});

    await passwordService.attach(adminId, {
      email: "admin@redlibs.com",
      password: "12345",
      username: "admin@redlibs.com",
    });
    await passwordService.attach(projectManagerId, {
      email: "project-manager@redlibs.com",
      password: "12345",
      username: "project-manager@redlibs.com",
    });
    await passwordService.attach(userId, {
      email: "user@redlibs.com",
      password: "12345",
      username: "user@redlibs.com",
    });

    await this.createPosts(projectManagerId);
  }

  async createPosts(projectManagerId: UserId) {
    const postsCollection = this.container.get(PostsCollection);
    await postsCollection.deleteMany({});
    await postsCollection.insertMany([
      {
        _id: "orphan",
        title: "1",
        description: "d1",
        adminOnlyField: "secret",
        private: false,
      },
      {
        _id: "pm_1",
        title: "1",
        description: "d1",
        adminOnlyField: "secret",
        ownerId: projectManagerId,
        private: false,
      },
      {
        _id: "pm_2",
        title: "1",
        description: "d1",
        adminOnlyField: "secret",
        private: true,
      },
    ]);
  }
}

export const PORT = 6400;

export async function createEcosystem(): Promise<ContainerInstance> {
  const kernel = new Kernel({
    bundles: [
      new LoggerBundle({
        console: false,
      }),
      new MongoBundle({
        uri: "mongodb://localhost:27017/tests",
      }),
      new PasswordBundle(),
      new GraphQLBundle(),
      new SecurityBundle(),
      new SecurityMongoBundle(),
      new XBundle({}),
      new ApolloBundle({
        port: PORT,
      }),
      new ApolloSecurityBundle(),
      new AppBundle(),
    ],
    parameters: {
      testing: true,
    },
  });

  await kernel.init();

  return kernel.container;
}
