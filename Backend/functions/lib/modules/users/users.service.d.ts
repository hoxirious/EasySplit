import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
export declare class UsersService {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static createUser(user: UserInfoSchema): Promise<FirebaseFirestore.WriteResult>;
    static getFriends(id: string): Promise<string[]>;
    static deleteFriend(userID: string, email: string): Promise<FirebaseFirestore.WriteResult>;
    static addFriend(id: string, friendEmail: string): Promise<FirebaseFirestore.WriteResult>;
}
