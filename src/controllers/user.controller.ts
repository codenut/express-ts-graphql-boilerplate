import { Router, Request, Response } from "express";

import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
  }

  private getUserById = async (_: Request, response: Response) => {
    response.send([]);
  };
}

export default UserController;
