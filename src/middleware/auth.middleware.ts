import { NextFunction, Response } from "express";

import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import RequestWithUser from "../interfaces/requestWithUser.interface";

async function authMiddleware(
  request: RequestWithUser,
  _: Response,
  next: NextFunction
) {
  try {
    // TODO authentication logic
    request.user = { firstName: "user" };
    next();
  } catch (error) {
    next(new WrongAuthenticationTokenException());
  }
}

export default authMiddleware;
