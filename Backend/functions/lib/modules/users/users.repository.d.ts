import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
export declare class UsersRepository {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static postUser(user: UserInfoSchema): Promise<FirebaseFirestore.WriteResult>;
    static deleteFriend(myUserID: string, targetUserID: string): Promise<FirebaseFirestore.WriteResult>;
    static addFriend(id: string, friendEmail: string): Promise<FirebaseFirestore.WriteResult>;
}
