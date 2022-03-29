export class ReturnGroupDebtBodyDto {
    oweList: Debt[]
  }
  
  export interface Debt {
    userID: string;
    name: string;
    debtAmount: number;
  }
  