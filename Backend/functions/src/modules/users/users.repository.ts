import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";

export class UsersRepository {
  static async getUser(id: string): Promise<UserInfoSchema> {
    const query = await db.users.where("userID", "==", id).get();
    let ToReturn: UserInfoSchema = {
      userID: "",
      email: "",
      name: "",
      friendList: [],
    };
    if (query.docs)
      query.docs.forEach((each: QueryDocumentSnapshot) => {
        if (each.data()) ToReturn = each.data() as UserInfoSchema;
      });
    return ToReturn;
  }

  static async postUser(
    user: UserInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    let empty: UserInfoSchema = {
      userID: "",
      email: "",
      name: "",
      friendList: [],
    };
    if ((await this.getUser(user.userID)) === empty)
      return await db.users.doc(user.userID).update(user);
    else return await db.users.doc(user.userID).set(user);
  }
}
