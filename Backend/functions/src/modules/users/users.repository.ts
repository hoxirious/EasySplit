import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserExpenseStateSchema, UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { GroupsRepository } from "../groups/groups.repository";

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


  //Get user name saved in friend list
  static async deleteFriend(myUserID: string, targetUserID: string) {
    const me = await UsersRepository.getUser(myUserID);
    const myFriendList = me.friendList;
    const newFriendList = myFriendList.filter( value => value !== targetUserID);
    return await db.users.doc(myUserID).update({
      friendList: newFriendList,
    });
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

  static async getUserGroupsInfo(id: string): Promise<GroupInfoSchema[]> {
    let ToReturn = [];
    for (const userGroupID of (await this.getUser(id)).groupList) {
      ToReturn.push(GroupsRepository.getGroup(userGroupID));
    }
    return ToReturn;
  }

  // delete expense from user's expense list
  static async deleteUserExpense(
    exp: ExpenseInfoSchema, 
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    let userExp: UserExpenseStateSchema = {
      expenseID : exp.expenseID,
      expenseState : exp.expenseState
    }
    const user = await this.getUser(userID);

    const expIndex = user.expenseList.indexOf(userExp);

    if(expIndex > -1) {
      user.expenseList.splice(expIndex, 1);
    }

    return await db.users.doc(user.userID).update({
      expenseList: user.expenseList,
    });
  }
}
