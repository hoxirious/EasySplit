import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { db } from "../../firebase/repository.firebase";

export class UsersRepository {
  // Add userId to parameter
  static async getUser(): Promise<UserInfoSchema> {
    const ToReturn = await db.users
      .doc("0MnU4YAxkxudABDpyIvc")
      .get();
    console.log(ToReturn.data());
    return ToReturn.data();
  }
}
