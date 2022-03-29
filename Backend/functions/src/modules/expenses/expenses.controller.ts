import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { FirebaseUser } from "../../nestjs/decorators/firebase-user.decorator";
import { BillingInfoSchema } from "../../schemas/expenses/billingInfo.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { EventsService } from "../events/events.service";
import { ReturnCurrentBalanceFromFriend } from "./dtos/get-currentBalanceFromFriend.dto";
import { ReturnFriendDebtBodyDto } from "./dtos/get-friendDebt.dto";
import { ReturnGroupDebtBodyDto } from "./dtos/get-groupDebt.dto";
import { GetSplitBillingBodyPayment } from "./dtos/get-splitBillingPayment.dto";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { AddExpenseToGroupBodyDto } from "./dtos/put-AddExpenseToGroupBodyDto.dto";
import { PutExpenseBodyDto } from "./dtos/put-expense.dto";
import { ExpensesService } from "./expenses.service";

@Controller("expense")
export class ExpensesController {
  @Put("/update/:expenseID")
  async updateExpenseByID(
    @FirebaseUser() user: UserRecord,
    @Param("expenseID") expenseID: string,
    @Body() body: PutExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    return await ExpensesService.updateExpense(user.uid, expenseID, body);
  }

  @Put("/updateGroup/:expenseID")
  async addExpenseToGroup(
    @Param("expenseID") expenseID: string,
    @Body() body: AddExpenseToGroupBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    const groupReference = body.groupReference;
    console.log("Adding expenseID to group");
    return await ExpensesService.addExpenseToGroup(expenseID, groupReference);
  }

  @Get("/getExpenseByID/:expenseID")
  async getExpenseByID(
    @Param("expenseID") expenseID: string
  ): Promise<ExpenseInfoSchema> {
    console.log("Getting expense by ID...");
    return await ExpensesService.getExpenseByID(expenseID);
  }

  @Post("/createExpense")
  async createExpense(
    @FirebaseUser() user: UserRecord,
    @Body() body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult | void> {
    console.log("Creating expense...");
    return await ExpensesService.createExpense(user.uid, body);
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

  @Get("/getExpenseByUserID")
  async getExpenseByUserID(
    @FirebaseUser() user: UserRecord
  ): Promise<ExpenseInfoSchema[]> {
    console.log("Getting expense by userID...");
    return await ExpensesService.getExpenseByUserID(user.uid);
  }

  // Delete expense by ID
  @Get("/delete/:expenseID")
  async deleteExpenseByID(
    @FirebaseUser() user: UserRecord,
    @Param("expenseID") expenseID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Deleting Expense by ID...");
    return await ExpensesService.deleteExpenseByID(user.uid, expenseID);
  }

  @Post("/splitExpense")
  async splitExpense(
    @Body() body: GetSplitBillingBodyPayment
  ): Promise<BillingInfoSchema[]> {
    return await ExpensesService.splitExpense(body.userPayment);
  }

  @Get("/fromFriend/:friendID")
  async getCurrentBalanceFromFriend(
    @FirebaseUser() user: UserRecord,
    @Param("friendID") friendID: string
  ): Promise<ReturnCurrentBalanceFromFriend> {
    return await EventsService.getDebtFromFriend(user.uid, friendID);
  }

  @Get("/friendDebt")
  async getFriendDebt(
    @FirebaseUser() user: UserRecord
  ): Promise<ReturnFriendDebtBodyDto> {
    return await EventsService.getFriendDebt(user.uid);
  }

  @Get("/groupDebt/:groupID")
  async getGroupDebt(
    @Param("groupID") groupID: string
  ): Promise<ReturnGroupDebtBodyDto> {
    return await EventsService.getGroupDebt(groupID);
  }
}
