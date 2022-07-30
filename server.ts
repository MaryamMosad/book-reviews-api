import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express from 'express'
import { buildSchema } from 'type-graphql';
import { UserResolver } from "./src/user/user.resolver";
import { logger } from "./src/common/logger/logger";
import { AuthResolver } from "./src/auth/auth.resolver";


const port = process.env.PORT || 1998

export async function startApolloServer() {
    const schema = await buildSchema({
        resolvers: [UserResolver, AuthResolver]
    })
    const server = new ApolloServer({
        schema, introspection: true, plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    })
    await server.start()
    const app = express();
    server.applyMiddleware({ app })
    app.listen(port,
        () => logger.info(`SERVER IS RUNNING ON 'http://localhost:${port}/graphql'`))
    return app;
}
