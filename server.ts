import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import { buildSchema } from "type-graphql";
import { logger } from "./src/common/logger/logger";
import {
  authChecker,
  getUserFromRequestHeaders,
} from "./src/auth/auth-middleware";
import { resolvers } from "./src/common/graphql/graphql-resolvers";
import { formatError } from "./src/common/exceptions/format-graphql-errors";

const port = process.env.PORT || 1998;

export async function startApolloServer() {
  const schema = await buildSchema({ resolvers, authChecker });
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      const currentUser = await getUserFromRequestHeaders(req);
      return {
        currentUser,
      };
    },
    formatError: (error) => formatError(error),
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  app.listen(port, () =>
    logger.info(`SERVER IS RUNNING ON 'http://localhost:${port}/graphql'`)
  );
  return app;
}
