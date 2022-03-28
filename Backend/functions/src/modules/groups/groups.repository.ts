import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UsersRepository } from "../users/users.repository";
import { ExpensesService } from "../expenses/expenses.repository"

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
    const user = await UsersRepository.getUser(userID);
    user.groupList.push(groupInfo.groupID);
    return (
      await db.users.doc(userID).update({
        groupList: user.groupList,
      }),
      await db.groups.doc(groupInfo.groupID).set(groupInfo)
    );
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

    //talks to firestore directly
    static async deleteGroup(
      userID: string,
      groupId: string,
    ): Promise<FirebaseFirestore.WriteResult> {
        const group = await GroupsRepository.getGroup(groupId);

        //check whether or not user is in group by checking member List
        if(userID in group.memberList){

          //loop through expenseList to delete all expense's in the list
          for( const expID of group.expenseList){
              ExpensesService.deleteExpenseByID(expID);
          }

          //update groupList
          await db.groups.doc(groupId).update({
            expenseList: [],
          });
          
        }

        //Delete the group
        return await db.groups.doc(groupId).delete();
      }
}
