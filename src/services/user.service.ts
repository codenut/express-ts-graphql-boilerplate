import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import FirebaseUser from "../interfaces/firebase.interface";
import { UserRepository } from "../repositories/user.repository";
import { BaseService } from "./base.service";

@Service()
export class UserService extends BaseService {
  constructor(@InjectRepository() userRepository: UserRepository) {
    super(userRepository);
  }

  async createUserFromFirebase(firebaseUser: FirebaseUser) {
    let user = await this.findOne({
      firebaseUid: firebaseUser.uid
    });

    if (!user) {
      user = this.create({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email
      });
      user = await this.save(user);
    }

    return user;
  }
}
