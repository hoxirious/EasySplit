import { ExpenseState } from "../../modules/expenses/definitions/expenses-info.definition";
export interface UserInfoSchema {
    userID: string;
    email: string;
    name: string;
    friendList: string[];
    groupList: string[];
    expenseList: UserExpenseStateSchema[];
}
export interface UserExpenseStateSchema {
    expenseID: string;
    expenseState: ExpenseState;
}
