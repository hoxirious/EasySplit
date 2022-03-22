import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UsersRepository } from "../users/users.repository";

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
                if (each.data()) ToReturn = each.data() as GroupInfoSchema
            });
        return ToReturn;
    }

    static async postGroups(
        groupInfo: GroupInfoSchema,
        userID: string
    ): Promise<FirebaseFirestore.WriteResult> {
        const user = await UsersRepository.getUser(userID);
        user.groupList.push(groupInfo.groupID);
        await db.users.doc(userID).update({
            groupList: user.groupList,
        })
        return await db.groups.doc(groupInfo.groupID).set(groupInfo);
    }

    static async addMember(
        groupID: string, 
        userID: string
    ): Promise<FirebaseFirestore.WriteResult> {
        const group = await this.getGroup(groupID);
        const user = await UsersRepository.getUser(userID);

        if (groupID in user.groupList === false || 
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
}