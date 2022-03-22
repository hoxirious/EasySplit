import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";

export class ExpensesRepository {
  static EMPTY_EXPENSE: {
    expenseID: "";
    groupRefence: "";
    description: "";
    timeStamp: "";
    totalExpense: 0;
    splitDetail: [];
    expenseState: ExpenseState.Undefined;
  };

  static async getExpenseByID(id: string): Promise<ExpenseInfoSchema> {
    const query = await db.expenses.doc(id).get();
    return query.data() ?? this.EMPTY_EXPENSE; // If (query.data() !== null && query.data() !== undefined) return query.data() else return EMPTY_EXPENSE
  }
  static async postExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log(expenseInfo.expenseID);
    try {
      return await db.expenses.doc(expenseInfo.expenseID).set(expenseInfo);
    } catch (error) {
      throw new Error("cannot post expense!");
    }
  }

  static async putExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      return await db.expenses.doc(expenseInfo.expenseID).update(expenseInfo);
    } catch (error) {
      throw new Error("cannot put expense!");
    }
  }
}
