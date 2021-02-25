import { Request } from "express";

interface User {
  firstName: string;
}

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
