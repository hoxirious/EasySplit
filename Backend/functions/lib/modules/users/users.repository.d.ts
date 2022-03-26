import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
export declare class UsersRepository {
    static getUser(id: string): Promise<UserInfoSchema>;
    static getUserByEmail(email: string): Promise<UserInfoSchema>;
    static postUser(user: UserInfoSchema): Promise<FirebaseFirestore.WriteResult>;
    static deleteFriend(myUserID: string, targetUserID: string): Promise<FirebaseFirestore.WriteResult>;
    static addFriend(id: string, friendEmail: string): Promise<FirebaseFirestore.WriteResult>;
    static getUserGroupsInfo(id: string): Promise<GroupInfoSchema[]>;
    static addExpenseInfo(expenseInfo: ExpenseInfoSchema, userID: string): Promise<FirebaseFirestore.WriteResult>;
    static deleteUserExpense(exp: ExpenseInfoSchema, userID: string): Promise<FirebaseFirestore.WriteResult>;
}
