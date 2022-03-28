import { UserRecord } from "firebase-functions/v1/auth";
import { StreamInfoSchema } from "../../schemas/events/stream-info.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { DeleteFriendListDto } from "./dtos/delete-friendList.dto";
import { GetUserByEmailDto } from "./dtos/get-user-by-email.dto";
import { PostUserBodyDto } from "./dtos/post-user.dto";
import { ReturnUserFriendsDto } from "./dtos/return-userfriends.dto";
export declare class UsersController {
    getUser(user: UserRecord): Promise<UserInfoSchema>;
    getUserByID(userID: string): Promise<UserInfoSchema>;
    createUser(user: UserRecord, body: PostUserBodyDto): Promise<FirebaseFirestore.WriteResult>;
    getFriend(user: UserRecord): Promise<ReturnUserFriendsDto[]>;
    findUser(body: GetUserByEmailDto): Promise<UserInfoSchema>;
    removeFriend(user: UserRecord, body: DeleteFriendListDto): Promise<FirebaseFirestore.WriteResult>;
    addFriend(user: UserRecord, body: GetUserByEmailDto): Promise<FirebaseFirestore.WriteResult>;
    getUserGroupsInfo(user: UserRecord): Promise<GroupInfoSchema[]>;
    getUserEvents(user: UserRecord): Promise<StreamInfoSchema>;
    createMockingData(): Promise<void>;
}
