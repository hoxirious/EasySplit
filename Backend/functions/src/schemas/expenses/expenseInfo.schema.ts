import { ExpenseState } from "../../modules/expenses/definitions/expenses-info.definition";
import { UserExpenseInfoSchema } from "./userExpense.schema";

export interface ExpenseInfoSchema {
  groupRefence?: string;
  description: string;
  timeStamp: string;
  totalExpense: number;
  splitDetail: UserExpenseInfoSchema[];
  expenseState: ExpenseState;
}
