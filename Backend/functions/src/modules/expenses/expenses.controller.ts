import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesService } from "./expenses.service";


@Controller("expense")
export class ExpensesController {

  // @Get("/user_expenses")
  // async getUserExpenses(@FirebaseUser() user: UserRecord): Promise<>{

  // }

  @Get("/:expenseID")
  async getExpenseByID(@Param("expenseID") expenseID: string): Promise<ExpenseInfoSchema>{
    console.log("Getting expense by ID...");
    return await ExpensesService.getExpenseByID(expenseID);
  }

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
