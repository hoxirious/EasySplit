import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { UsersRepository } from "./users.repository";

export class UsersService {
  static async getUser(): Promise<UserInfoSchema> {
    // Call Firebase Auth to get UserId
    // Call createUser in Repository with parameter includes userID
    return await UsersRepository.getUser();
  }

  //   static async createUser = (req: PostUserReqDto): Promise<void> => {
  // Call Firebase Auth to get UserId
  // Call createUser in Repository with parameter includes userID
  //   };
}
