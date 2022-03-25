import { BillingInfoSchema } from "../../../schemas/expenses/billingInfo.schema";

export class PostExpenseBodyDto {
  groupRefence?: string;
  description: string;
  totalExpense: number;
  splitDetail: BillingInfoSchema[];
}
