import { UserRecord } from "firebase-functions/v1/auth";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { GetUserByEmailDto } from "./dtos/get-user-by-email.dto";
import { PostUserBodyDto } from "./dtos/post-user.dto";
export declare class UsersController {
    getUser(user: UserRecord): Promise<UserInfoSchema>;
    createUser(user: UserRecord, body: PostUserBodyDto): Promise<FirebaseFirestore.WriteResult>;
    getFriend(user: UserRecord): Promise<string[]>;
    findUser(body: GetUserByEmailDto): Promise<UserInfoSchema>;
}
