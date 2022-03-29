import { BillingInfoSchema } from "../../../schemas/expenses/billingInfo.schema";
import { ExpenseState } from "../definitions/expenses-info.definition";

export class PutExpenseBodyDto {
  groupReference?: string;
  description: string;
  totalExpense: number;
  splitDetail: BillingInfoSchema[];
  expenseState: ExpenseState;
}
