import { UserRecord } from "firebase-functions/v1/auth";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { DeleteGroupDto } from "../users/dtos/delete-group.dto";
import { AddMemberDto } from "./dtos/add-member.dto";
import { GetGroupDto } from "./dtos/get-group.dto";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { RemoveMemberDto } from "./dtos/remove-member.dto";
export declare class GroupsController {
    getGroup(body: GetGroupDto): Promise<GroupInfoSchema>;
    createGroup(user: UserRecord, body: PostGroupBodyDto): Promise<FirebaseFirestore.WriteResult | void>;
    addMember(body: AddMemberDto): Promise<FirebaseFirestore.WriteResult>;
    removeMember(body: RemoveMemberDto): Promise<FirebaseFirestore.WriteResult>;
    static deleteGroup(user: UserRecord, body: DeleteGroupDto): Promise<FirebaseFirestore.WriteResult | void>;
}
