import { SplitType } from "../definitions/billing-payment.definition";

//* This will be used to calculate the the splitted bill for each member
export class GetSplitBillingPayment {
  userList: string[];
  totalAmount: number;
  splitType: SplitType;
  exactAmountList?: number[];
  exactPercentageList?: number[];
}
