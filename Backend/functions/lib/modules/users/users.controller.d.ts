import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { PostUserReqDto } from "./dtos/post-user.dto";
export declare class UsersController {
    getUser(): Promise<UserInfoSchema>;
    createUser(req: PostUserReqDto): Promise<void>;
}
