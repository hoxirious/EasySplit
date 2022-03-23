import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { db } from "../../firebase/repository.firebase";
import { GroupsRepository } from "./groups.repository";
import { UsersRepository } from "../users/users.repository";

export class GroupService {
    static async getGroup(id: string): Promise<GroupInfoSchema> {
        return await GroupsRepository.getGroup(id);
    }
    
    static async createGroup(
        body: PostGroupBodyDto,
        userID: string
    ): Promise<FirebaseFirestore.WriteResult> {
        const groupID = db.groups.doc().id;
        const groupInfo: GroupInfoSchema = {
            groupID,
            expenseList: [],
            ...body,
        }
        return await GroupsRepository.postGroups(groupInfo, userID)
    }

    static async addMember(
        groupID: string, 
        userID: string
    ): Promise<FirebaseFirestore.WriteResult> {
        return await GroupsRepository.addMember(groupID, userID);
    }

    static async removeMember(
        groupID: string,
        userID: string
    ): Promise<FirebaseFirestore.WriteResult> {
        const group = await GroupsRepository.getGroup(groupID);
        const user = await UsersRepository.getUser(userID);
        
        const userIndex = group.memberList.indexOf(userID);
        const groupIndex = user.groupList.indexOf(groupID);
        
        if (userIndex > -1 && groupIndex > -1) {
            group.memberList.splice(userIndex, 1);
            user.groupList.splice(groupIndex, 1);
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