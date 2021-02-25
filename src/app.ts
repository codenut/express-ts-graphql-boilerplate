import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";
import GraphQlSchema from "./graphql";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeGraphQl();
    this.initializeStaticFileRoutes();
  }

  public listen() {
    const port = process.env.PORT || 3001;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  private initializeGraphQl() {
    GraphQlSchema.then(schema => {
      this.app.use(
        "/graphql",
        graphqlHTTP({
          schema,
          graphiql: true
        })
      );
    });
  }

  private initializeStaticFileRoutes() {
    this.app.use("/static", express.static("public"));
  }
}

export default App;
