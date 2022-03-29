//* This will be used to calculate the the splitted bill for each member
export class GetSplitBillingBodyPayment {
  userPayment: AmountPaymentInfo[];
}

export interface AmountPaymentInfo {
  email: string;
  paidAmount: number;
  splitAmount: number;
}

