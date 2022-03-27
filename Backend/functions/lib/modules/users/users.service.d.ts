import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { PostUserServiceDto } from "./dtos/post-user.dto";
import { ReturnUserFriendsDto } from "./dtos/return-userfriends.dto";
export declare class UsersService {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static createUser(user: PostUserServiceDto): Promise<FirebaseFirestore.WriteResult>;
    static getFriends(id: string): Promise<ReturnUserFriendsDto[]>;
    static deleteFriend(userID: string, email: string): Promise<FirebaseFirestore.WriteResult>;
    static addFriend(id: string, friendEmail: string): Promise<FirebaseFirestore.WriteResult>;
    static getUserGroupsInfo(id: string): Promise<GroupInfoSchema[]>;
}
