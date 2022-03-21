import { ExpenseInfoSchema } from "../schemas/expenses/expenseInfo.schema";
import { UserInfoSchema } from "../schemas/users/userInfo.schema";
export declare const dataPoint: <T>(collectionPath: string) => FirebaseFirestore.CollectionReference<T>;
export declare const db: {
    users: FirebaseFirestore.CollectionReference<UserInfoSchema>;
    expenses: FirebaseFirestore.CollectionReference<ExpenseInfoSchema>;
};
