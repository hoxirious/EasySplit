import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";

export class UsersRepository {

  static async getUser(id: string): Promise<UserInfoSchema> {
    const ToReturn = await db.users.where("userID", "==", id).get();

    // todos: Handle error
    const result: UserInfoSchema[] = ToReturn.docs.map(
      (each: QueryDocumentSnapshot) => each.data() as UserInfoSchema
    );
    return result[0];
  }

  static async postUser(
    user: UserInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await db.users.doc().set(user);
  }
}
