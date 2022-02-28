import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { db } from "../../firebase/repository.firebase";

export class UsersRepository {
  // Todos: Query User Information with userID
  static async getUser(): Promise<UserInfoSchema> {
    const ToReturn = await db.users.where("userID", "==", "testid").get();

    // todos: Handle error
    const result: UserInfoSchema[] = ToReturn.docs.map(
      (each: QueryDocumentSnapshot) => each.data() as UserInfoSchema
    );
    return result[0];
  }
}
