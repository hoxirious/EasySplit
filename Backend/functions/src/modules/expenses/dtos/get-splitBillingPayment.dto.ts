import { SplitType } from "../definitions/billing-payment.definition";

export class GetSplitBillingPayment {
  userList: string[];
  totalAmount: number;
  splitType: SplitType;
  exactAmountList?: number[];
  exactPercentageList?: number[];
}
