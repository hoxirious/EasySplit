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
      groupList: [],
      expenseList: [],
    };
    if (query.docs)
      query.docs.forEach((each: QueryDocumentSnapshot) => {
        if (each.data()) ToReturn = each.data() as UserInfoSchema;
      });
    return ToReturn;
  }

  static async getUserByEmail(email: string): Promise<UserInfoSchema> {
    const query = await db.users.where("email", "==", email).get();
    let ToReturn: UserInfoSchema = {
      userID: "",
      email: "",
      name: "",
      friendList: [],
      groupList: [],
      expenseList: [],
    };
    if (query.docs)
      query.docs.forEach((each: QueryDocumentSnapshot) => {
        if (each.data()) ToReturn = each.data() as UserInfoSchema;
      });
    return ToReturn;
  }

  static async postUser(
    user: UserInfoSchema,
  ): Promise<FirebaseFirestore.WriteResult> {
    let empty: UserInfoSchema = {
      userID: "",
      email: "",
      name: "",
      friendList: [],
      groupList: [],
      expenseList: [],
    };
    if ((await this.getUser(user.userID)) === empty)
      return await db.users.doc(user.userID).update(user);
    else return await db.users.doc(user.userID).set(user);
  }

  static async addFriend(
    id: string,
    friendEmail: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    const friend = await this.getUserByEmail(friendEmail);
    const user = await this.getUser(id);

    if (
      friend.userID in user.friendList === false ||
      user.userID in friend.friendList === false
    ) {
      friend.friendList.push(user.userID);
      user.friendList.push(friend.userID);
    }

    return (
      await db.users.doc(user.userID).update({
        friendList: user.friendList,
      }),
      await db.users.doc(friend.userID).update({
        friendList: friend.friendList,
      })
    );
  }
}
