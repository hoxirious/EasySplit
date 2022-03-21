import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { PutExpenseBodyDto } from "./dtos/put-expense.dto";
import { ExpensesService } from "./expenses.service";

@Controller("expense")
export class ExpensesController {
  
  @Put("/update/:expenseID")
   async updateExpenseByID(
    @Param("expenseID") expenseID: string,
    @Body() body: PutExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    return await ExpensesService.updateExpense(expenseID, body);
  }

  @Get("/:expenseID")
   async getExpenseByID(
    @Param("expenseID") expenseID: string
  ): Promise<ExpenseInfoSchema> {
    console.log("Getting expense by ID...");
    return await ExpensesService.getExpenseByID(expenseID);
  }

  @Post("/createExpense")
   async createExpense(
    @Body() body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Creating expense...");
    return await ExpensesService.createExpense(body);
  }
}
