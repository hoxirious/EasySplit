//* This will be used to calculate the the splitted bill for each member
export class GetSplitBillingBodyPayment {
  userPayment: AmountPaymentInfo[];
}

export interface AmountPaymentInfo {
  userID: string;
  paidAmount: number;
  splitAmount: number;
}

