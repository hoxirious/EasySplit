import { BillingInfoSchema } from "../../../schemas/expenses/billingInfo.schema";

export class PostExpenseBodyDto {
  groupReference?: string;
  description: string;
  totalExpense: number;
  splitDetail: BillingInfoSchema[];
}
