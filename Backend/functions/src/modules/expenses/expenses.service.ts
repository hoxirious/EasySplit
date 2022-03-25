import { db } from "../../firebase/repository.firebase";
import { BillingInfoSchema } from "../../schemas/expenses/billingInfo.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { GetSplitBillingBodyPayment } from "./dtos/get-splitBillingPayment.dto";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
  static splitExpense(body: GetSplitBillingBodyPayment): BillingInfoSchema[] {
    const billingReturn: BillingInfoSchema[] = [];

    //* Loop through the users payment information to calculate the lent amount
    body.userPayment.forEach((user) => {
      billingReturn.push({
        userID: user.userID,
        paidAmount: user.paidAmount,
        lentAmount: user.paidAmount - user.splitAmount,
      });
    });

    return billingReturn;
  }
  static async updateExpense(
    expenseID: string,
    body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    const timeStamp = new Date().toLocaleString();
    const expenseInfo: ExpenseInfoSchema = {
      expenseID,
      timeStamp,
      expenseState: ExpenseState.Active,
      ...body,
    };
    return await ExpensesRepository.putExpense(expenseInfo);
  }
  static async getExpenseByID(id: string): Promise<ExpenseInfoSchema> {
    return await ExpensesRepository.getExpenseByID(id);
  }
  static async createExpense(
    body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    const timeStamp = new Date().toLocaleString();
    const expenseID = db.expenses.doc().id;

    const expenseInfo: ExpenseInfoSchema = {
      expenseID,
      timeStamp,
      expenseState: ExpenseState.Active,
      ...body,
    };
    return await ExpensesRepository.postExpense(expenseInfo);
  }

  static async getExpenseByGroupID(id: string): Promise<ExpenseInfoSchema[]> {
    return await ExpensesRepository.getExpenseByGroupID(id);
  }
}

// body.userList.forEach((userID) => {
//   if (userID === body.paidBy) {
//     const userBilling: BillingInfoSchema = {
//       userID,
//       paidAmount: body.totalAmount,
//       lentAmount: body.totalAmount / body.userList.length,
//     };
//     billingReturn.push(userBilling);
//   } else {
//     const userBilling: BillingInfoSchema = {
//       userID,
//       paidAmount: 0,
//       lentAmount: -body.totalAmount / body.userList.length,
//     };
//     billingReturn.push(userBilling);
//   }
// });
