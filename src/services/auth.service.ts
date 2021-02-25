import { Service } from "typedi";
import * as admin from "firebase-admin";

import * as firebaseAccountCredentials from "../../config/firebase-service-account.json";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

@Service()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticateFromToken(idToken: string): Promise<User> {
    const firebaseUser = await admin.auth().verifyIdToken(idToken);
    return this.userService.createUserFromFirebase(firebaseUser);
  }
}
