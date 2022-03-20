import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
export declare class UsersRepository {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static postUser(user: UserInfoSchema): Promise<FirebaseFirestore.WriteResult>;
}
