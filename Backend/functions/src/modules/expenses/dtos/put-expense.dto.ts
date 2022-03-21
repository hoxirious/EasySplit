import { UserExpenseInfoSchema } from "../../../schemas/expenses/userExpense.schema";
import { ExpenseState } from "../definitions/expenses-info.definition";

export class PutExpenseBodyDto {
  groupRefence?: string;
  description: string;
  totalExpense: number;
  splitDetail: UserExpenseInfoSchema[];
  expenseState: ExpenseState;
}
