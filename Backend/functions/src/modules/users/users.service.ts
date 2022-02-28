import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { UsersRepository } from "./users.repository";

export class UsersService {

  //Todos: Call Firebase Auth to get UserId
  static async getUser(): Promise<UserInfoSchema> {
    return await UsersRepository.getUser();
  }
}
