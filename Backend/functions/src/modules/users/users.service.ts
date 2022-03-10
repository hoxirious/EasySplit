import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { UsersRepository } from "./users.repository";

export class UsersService {

  static async getUser(id: string): Promise<UserInfoSchema> {
    return await UsersRepository.getUser(id);
  }

  static async createUser(
    user: UserInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await UsersRepository.postUser(user);
  }
}
