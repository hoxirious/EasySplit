import { ExpenseState } from "../../modules/expenses/definitions/expenses-info.definition";
import { UserExpenseInfoSchema } from "./userExpense.schema";

export interface ExpenseInfoSchema {
  expenseID: string;
  groupReference?: string;
  description: string;
  timeStamp: string;
  totalExpense: number;
  splitDetail: UserExpenseInfoSchema[];
  expenseState: ExpenseState;
}
