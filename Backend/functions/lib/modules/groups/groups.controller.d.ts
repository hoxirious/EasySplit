import { UserRecord } from "firebase-functions/v1/auth";
import { PostGroupBodyDto } from './dtos/post-group.dto';
import { AddMemberDto } from './dtos/add-member.dto';
import { GroupInfoSchema } from '../../schemas/groups/groupInfo.schema';
import { GetGroupDto } from './dtos/get-group.dto';
export declare class GroupsController {
    getGroup(body: GetGroupDto): Promise<GroupInfoSchema>;
    createGroup(user: UserRecord, body: PostGroupBodyDto): Promise<FirebaseFirestore.WriteResult>;
    addMember(body: AddMemberDto): Promise<FirebaseFirestore.WriteResult>;
}
