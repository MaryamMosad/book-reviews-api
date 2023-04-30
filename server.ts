import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import {
  authChecker,
  getUserFromRequestHeaders
} from "./src/auth/auth-middleware";
import { resolvers } from "./src/common/graphql/graphql-resolvers";
import { formatError } from "./src/common/graphql/format-graphql-errors";
import { graphqlQueryComplexity } from "./src/common/graphql/graphql-query-complexity";

export class GraphqlServer {
  async start(app) {
    const schema = await buildSchema({ resolvers, authChecker });
    const server = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        {
          requestDidStart: () => graphqlQueryComplexity()
        }
      ],
      context: async ({ req }) => {
        const currentUser = await getUserFromRequestHeaders(req);
        return {
          currentUser
        };
      },
      formatError: (error) => formatError(error)
    });
    await server.start();
    server.applyMiddleware({ app });
  }
}
