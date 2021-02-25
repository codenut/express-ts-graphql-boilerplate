import { buildSchema } from "type-graphql";
import { applyMiddleware } from "graphql-middleware";
import { Container as TypeormContainer } from "typeorm-typedi-extensions";
import { Container } from "typedi";

import { UserResolver } from "./user/user.resolver";
import { ResolveTimeMiddleware } from "./middlewares";
import { AuthService } from "../services/auth.service";

const customAuthChecker = (
  { root, context }: { root: any; context: any },
  roles: string[]
) => {
  if (roles.includes("OWNER")) {
    return root.id === context.user.id;
  }
  return !!context.user;
};

const authenticateRequest = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.user) {
    const authService = Container.get(AuthService);
    const idToken = context.headers.authorization.split("Bearer ")[1];
    context.user = await authService.authenticateFromToken(idToken);
  }

  return await resolve(root, args, context, info);
};

const schema = buildSchema({
  resolvers: [UserResolver],
  authChecker: customAuthChecker,
  globalMiddlewares: [ResolveTimeMiddleware],
  container: TypeormContainer
}).then(schema => applyMiddleware(schema, authenticateRequest));

export default schema;
