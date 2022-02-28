import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { db } from "../../firebase/repository.firebase";

export class UsersRepository {
  // Todos: Query User Information with userID
  static async getUser(): Promise<UserInfoSchema> {
    const ToReturn = await db.users.where("userID", "==", "testid").get();

    let result = {
      email: "",
      name: "",
      userID: "",
      friendList: [],
    };
    if (ToReturn.size === 1) {
      ToReturn.forEach((doc) => (result = doc.data()));
      return result;
    }
    return result;
  }
}
