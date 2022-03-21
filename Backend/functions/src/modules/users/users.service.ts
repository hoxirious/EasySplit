import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { UsersRepository } from "./users.repository";

export class UsersService {
  static async getUser(id: string): Promise<UserInfoSchema> {
    return await UsersRepository.getUser(id);
  }

  static async getUserByEmail(email: string): Promise<UserInfoSchema> {
    return await UsersRepository.getUserByEmail(email);
  }

  static async createUser(
    user: UserInfoSchema,
  ): Promise<FirebaseFirestore.WriteResult> {
    return await UsersRepository.postUser(user);
  }

  //Calls the getUser() method to retrieve user and then retrieves users friendslist
  static async getFriends(id: string): Promise<string[]> {
    return (await UsersRepository.getUser(id)).friendList;
  }

  static async addFriend(
    id: string,
    friendEmail: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    return await UsersRepository.addFriend(id, friendEmail);
  }
}
