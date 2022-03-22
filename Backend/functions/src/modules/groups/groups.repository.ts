import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UsersRepository } from "../users/users.repository";

export class GroupsRepository {
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
}