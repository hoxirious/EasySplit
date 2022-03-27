import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { FirebaseUser } from "../../nestjs/decorators/firebase-user.decorator";
import { BillingInfoSchema } from "../../schemas/expenses/billingInfo.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GetSplitBillingBodyPayment } from "./dtos/get-splitBillingPayment.dto";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { AddExpenseToGroupBodyDto } from "./dtos/put-AddExpenseToGroupBodyDto.dto";
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

  @Put("/updateGroup/:expenseID")
  async addGroupExpense(
    @Param("expenseID") expenseID: string,
    @Body() body: AddExpenseToGroupBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    const groupReference = body.groupReference
    console.log("Adding expenseID to group");
    return await ExpensesService.addGroupExpense(expenseID, groupReference);
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

  @Get("/getExpenseByGroup/:groupID")
  async getExpenseByGroupID(
    @Param("groupID") groupID: string
  ): Promise<ExpenseInfoSchema[]> {
    console.log("Getting expense by groupID...");
    return await ExpensesService.getExpenseByGroupID(groupID);
  }

  @Get("/getExpenseWithFriend/:friendID")
  async getExpenseWithFriend(
    @FirebaseUser() user: UserRecord,
    @Param("friendID") friendID: string
  ): Promise<ExpenseInfoSchema[]> {
    console.log("Getting expense with friend...");
    return await ExpensesService.getExpenseWithFriend(user.uid, friendID);
  }

  // Delete expense by ID
  @Delete("/delete/:expenseID")
  async deleteExpenseByID(
    @Param("expenseID") expenseID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Deleting Expense by ID...");
    return await ExpensesService.deleteExpenseByID(expenseID);
  }

  @Get("/splitExpense")
  splitExpense(@Body() body: GetSplitBillingBodyPayment): BillingInfoSchema[] {
    return ExpensesService.splitExpense(body);
  }
}
