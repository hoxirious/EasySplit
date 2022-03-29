import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { ExpensesService } from "../expenses/expenses.service";
import { UsersRepository } from "../users/users.repository";
import { UsersService } from "../users/users.service";

export class GroupsRepository {
  static async getGroup(id: string): Promise<GroupInfoSchema> {
    const query = await db.groups.where("groupID", "==", id).get();
    let ToReturn: GroupInfoSchema = {
      groupID: "",
      groupName: "",
      memberList: [],
      expenseList: [],
    };
    if (query.docs)
      query.docs.forEach((each: QueryDocumentSnapshot) => {
        if (each.data()) ToReturn = each.data() as GroupInfoSchema;
      });
    return ToReturn;
  }

  static async postGroups(
    groupInfo: GroupInfoSchema,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const yourself = await UsersRepository.getUser(userID);
    const users = await Promise.all(
      groupInfo.memberList.map(async (email) => {
        return await UsersService.getUserByEmail(email);
      })
    );
    users.push(yourself);
    groupInfo.memberList = [];
    for (const user of users) {
      groupInfo.memberList.push(user.userID);
      user.groupList.push(groupInfo.groupID);
      await db.users.doc(user.userID).update({
        groupList: user.groupList,
      });
    }
    return await db.groups.doc(groupInfo.groupID).set(groupInfo);
  }

  static async addMember(
    groupID: string,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const group = await this.getGroup(groupID);
    const user = await UsersRepository.getUser(userID);

    if (
      groupID in user.groupList === false ||
      userID in group.memberList === false
    ) {
      group.memberList.push(userID);
      user.groupList.push(groupID);
    }
    return (
      await db.groups.doc(group.groupID).update({
        memberList: group.memberList,
      }),
      await db.users.doc(user.userID).update({
        groupList: user.groupList,
      })
    );
  }

  static async deleteExpenseInGroup(
    expenseID: string,
    groupID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const groupInfo = await this.getGroup(groupID);

    const groupIndex = groupInfo.expenseList.indexOf(expenseID);

    if (groupIndex > -1) {
      groupInfo.expenseList.splice(groupIndex, 1);
      return await db.groups.doc(groupID).update({
        expenseList: groupInfo.expenseList,
      });
    } else throw new Error("expenseID not found");
  }

  //talks to firestore directly
  static async deleteGroup(
    userID: string,
    groupId: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const group = await GroupsRepository.getGroup(groupId);

    //* check whether or not user is in group by checking member List
    if (userID in group.memberList) {
      //* loop through expenseList to delete every expense in the list
      for (const expenseID of group.expenseList) {
        ExpensesService.deleteExpenseByID(userID, expenseID);
      }
    }

    //* Delete the group in Group collection
    return await db.groups.doc(groupId).delete();
  }
}
