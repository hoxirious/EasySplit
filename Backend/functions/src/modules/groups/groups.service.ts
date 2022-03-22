import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { db } from "../../firebase/repository.firebase";
import { GroupsRepository } from "./groups.repository";

export class GroupService {
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
}