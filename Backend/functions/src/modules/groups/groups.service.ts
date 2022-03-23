import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { db } from "../../firebase/repository.firebase";
import { GroupsRepository } from "./groups.repository";

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
        return await GroupsRepository.removeMember(groupID, userID); 
    }
}