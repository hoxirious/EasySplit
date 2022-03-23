import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { PostUserServiceDto } from "./dtos/post-user.dto";
export declare class UsersService {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static createUser(user: PostUserServiceDto): Promise<FirebaseFirestore.WriteResult>;
    static getFriends(id: string): Promise<string[]>;
    static deleteFriend(userID: string, email: string): Promise<FirebaseFirestore.WriteResult>;
    static addFriend(id: string, friendEmail: string): Promise<FirebaseFirestore.WriteResult>;
    static getUserGroupsInfo(id: string): Promise<GroupInfoSchema[]>;
}
