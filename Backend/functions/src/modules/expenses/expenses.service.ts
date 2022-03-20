import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
  static async createExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await ExpensesRepository.postExpense(expenseInfo);
  }
}
