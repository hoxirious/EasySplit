import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";

export class UsersRepository {
  static async getUser(id: string): Promise<UserInfoSchema> {
    const query = await db.users.where("userID", "==", id).get();

    let ToReturn: UserInfoSchema;
    query.docs.forEach((each: QueryDocumentSnapshot) => {
      ToReturn = each.data() as UserInfoSchema;
    });

    if (ToReturn) return ToReturn;
    else throw new Error("user/not-found");
  }

  static async postUser(
    user: UserInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log(user);
    return await db.users.doc().set(user);
  }
}
