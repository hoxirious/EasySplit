import { UserRecord } from "firebase-functions/v1/auth";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { DeleteFriendListDto } from "./dtos/delete-friendList.dto";
import { GetUserByEmailDto } from "./dtos/get-user-by-email.dto";
import { PostUserBodyDto } from "./dtos/post-user.dto";
export declare class UsersController {
    getUser(user: UserRecord): Promise<UserInfoSchema>;
    createUser(user: UserRecord, body: PostUserBodyDto): Promise<FirebaseFirestore.WriteResult>;
    getFriend(user: UserRecord): Promise<string[]>;
    findUser(body: GetUserByEmailDto): Promise<UserInfoSchema>;
    removeFriend(user: UserRecord, body: DeleteFriendListDto): Promise<FirebaseFirestore.WriteResult>;
    addFriend(user: UserRecord, body: GetUserByEmailDto): Promise<FirebaseFirestore.WriteResult>;
}
