import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";

export class ExpensesRepository {
  static async postExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await db.expenses.doc().set(expenseInfo);
  }
}
