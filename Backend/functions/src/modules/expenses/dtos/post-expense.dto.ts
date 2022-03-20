import { UserExpenseInfoSchema } from "../../../schemas/expenses/userExpense.schema";

export class PostExpenseBodyDto{
  groupRefence?: string;
  description: string;
  totalExpense: number;
  splitDetail: UserExpenseInfoSchema[];
}