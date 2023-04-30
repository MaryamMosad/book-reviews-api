import "dotenv/config";
import express from "express";
import { GraphqlServer } from "./server";
import { dbConnection } from "./src/common/database/db-config";
import { logger } from "./src/common/logger/logger";

const port = +process.env.PORT || 1998;

const app = express();

const server = new GraphqlServer();

server.start(app);

app.listen(port, () =>
  logger.info(`SERVER IS RUNNING ON 'http://localhost:${port}/graphql'`)
);

dbConnection();
