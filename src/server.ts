import "dotenv/config";
import { createConnection, ConnectionOptions, useContainer } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Container } from "typeorm-typedi-extensions";

import App from "./app";
import UserController from "./controllers/user.controller";
import validateEnv from "./utils/validateEnv";
import ormConfig from "../ormconfig";

useContainer(Container);

const connectionOptions = ormConfig as ConnectionOptions;

const startServer = async () => {
  await createConnection({
    ...connectionOptions,
    namingStrategy: new SnakeNamingStrategy()
  });

  validateEnv();

  const app = new App([new UserController()]);
  app.listen();
};

startServer();
