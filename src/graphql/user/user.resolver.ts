import {
  Arg,
  Authorized,
  Resolver,
  Query,
  Ctx,
  InputType,
  Field,
  Mutation
} from "type-graphql";
import { Service } from "typedi";

import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Service()
@InputType({ description: "update user data" })
class UpdateUserInput implements Partial<User> {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @Authorized()
  me(@Ctx() ctx: any): User {
    console.log("me");
    return ctx.user;
  }

  @Mutation(() => User)
  @Authorized()
  async updateUser(
    @Arg("data") updateUserInput: UpdateUserInput,
    @Ctx() ctx: any
  ): Promise<User> {
    console.log("a", ctx);
    const user = await this.userService.findOne({
      id: ctx.user.id
    });
    return await this.userService.save({
      ...user,
      ...updateUserInput
    });
  }
}
