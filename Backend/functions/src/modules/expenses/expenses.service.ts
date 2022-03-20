import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
  static async getExpenseByID(id: string): Promise<ExpenseInfoSchema> {
    return await ExpensesRepository.getExpenseByID(id);
  }
  static async createExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await ExpensesRepository.postExpense(expenseInfo);
  }
}
