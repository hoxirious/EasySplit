import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
export declare class UsersRepository {
    static getUser(): Promise<UserInfoSchema>;
}
