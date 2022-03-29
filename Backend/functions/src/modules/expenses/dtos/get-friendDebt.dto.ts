export class ReturnFriendDebtBodyDto {
  youOwe: Debt[];
  friendOwe: Debt[];
}

export interface Debt {
  friendID: string;
  name: string;
  debtAmount: number;
}
