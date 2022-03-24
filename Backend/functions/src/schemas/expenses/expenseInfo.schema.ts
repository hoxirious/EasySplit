import { ExpenseState } from "../../modules/expenses/definitions/expenses-info.definition";
import { BillingInfoSchema } from "./billingInfo.schema";

/**
 * The schema for expense that 
 */
export interface ExpenseInfoSchema {
  expenseID: string;
  groupReference?: string;
  description: string;
  timeStamp: string;
  totalExpense: number;
  splitDetail: BillingInfoSchema[];
  expenseState: ExpenseState;
}
