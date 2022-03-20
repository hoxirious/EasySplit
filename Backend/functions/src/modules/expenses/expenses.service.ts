import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
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
}
