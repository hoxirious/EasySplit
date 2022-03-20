import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";

export class ExpensesRepository {
  static EMPTY_EXPENSE: {
    groupRefence: "";
    description: "";
    timeStamp: "";
    totalExpense: 0;
    splitDetail: [];
    expenseState: ExpenseState.Undefined;
  };

  static async getExpenseByID(id: string): Promise<ExpenseInfoSchema> {
    const query = await db.expenses.doc(id).get();
    return query.data() ?? this.EMPTY_EXPENSE;
  }
  static async postExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    return await db.expenses.doc().set(expenseInfo);
  }
}
