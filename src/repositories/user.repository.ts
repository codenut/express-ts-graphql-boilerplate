import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";

import { User } from "../models/user.model";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }
}
