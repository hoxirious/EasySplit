import { Body, Controller, Post } from "@nestjs/common";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesService } from "./expenses.service";


@Controller("expense")
export class ExpensesController {
  @Post("/createExpense")
  async createExpense(
    @Body() body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Creating expense...");
    const timeStamp = new Date().toLocaleString();
    const expenseInfo: ExpenseInfoSchema = {
      timeStamp,
      expenseState: ExpenseState.Active,
      ...body,
    };
    return await ExpensesService.createExpense(expenseInfo);
  }
}
