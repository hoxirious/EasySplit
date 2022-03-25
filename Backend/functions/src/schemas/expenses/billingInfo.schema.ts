export interface BillingInfoSchema{
    // your userID
    userID: string;
    // The amount that you have paid the the expense
    paidAmount: number; 
    // The amount that you lend the others
    // e.g. positive means the amount you will get
    //      negative mean the amount you will pay
    lentAmount: number; 
}