import { db } from "../../firebase/repository.firebase";
import { BillingInfoSchema } from "../../schemas/expenses/billingInfo.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { EventType } from "../events/definitions/event-type.definition";
import { EventsService } from "../events/events.sevice";
import { GroupsRepository } from "../groups/groups.repository";
import { UsersRepository } from "../users/users.repository";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { GetSplitBillingBodyPayment } from "./dtos/get-splitBillingPayment.dto";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
  static async getExpenseByUserID(
    userID: string
  ): Promise<ExpenseInfoSchema[]> {
    const ToReturn: ExpenseInfoSchema[] = [];
    const expenseIDList = (await UsersRepository.getUser(userID)).expenseList;
    for (const expenseID of expenseIDList) {
      const expenseInfo = await this.getExpenseByID(expenseID);
      ToReturn.push(expenseInfo);
    }
    return ToReturn;
  }
  static async getExpenseWithFriend(
    userID: string,
    friendID: string
  ): Promise<ExpenseInfoSchema[]> {
    const expenseIDList = (await UsersRepository.getUser(userID)).expenseList;

    const ToReturn: ExpenseInfoSchema[] = [];

    for (const expenseID of expenseIDList) {
      const expenseInfo = await this.getExpenseByID(expenseID);
      let isWithFriend = false;
      expenseInfo.splitDetail.forEach((billing) => {
        if (billing.userID === friendID) isWithFriend = true;
      });
      if (isWithFriend) ToReturn.push(expenseInfo);
    }

    return ToReturn;
  }

  static splitExpense(body: GetSplitBillingBodyPayment): BillingInfoSchema[] {
    const billingReturn: BillingInfoSchema[] = [];

    //* Loop through the users payment information to calculate the lent amount
    body.userPayment.forEach((user) => {
      billingReturn.push({
        userID: user.userID,
        paidAmount: user.paidAmount,
        lentAmount: user.paidAmount - user.splitAmount,
      });
    });

    return billingReturn;
  }

  static async updateExpense(
    userID: string,
    expenseID: string,
    body: PostExpenseBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    const timeStamp = new Date().toLocaleString();
    const expenseInfo: ExpenseInfoSchema = {
      expenseID,
      timeStamp,
      expenseState: ExpenseState.Active,
      ...body,
    };

    return await EventsService.createEvent(
      EventType.ExpenseUpdate,
      expenseInfo,
      userID,
      userID
    );
  }

  static async getExpenseByID(id: string): Promise<ExpenseInfoSchema> {
    return await ExpensesRepository.getExpenseByID(id);
  }

  static async createExpense(
    userID: string,
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

    //* If group reference exists, create the expenseID inside the group collection
    if (expenseInfo.groupReference) {
      await this.addExpenseToGroup(
        expenseInfo.expenseID,
        expenseInfo.groupReference
      );
    }

    //* For each participant, create an ExpenseCreate that includes userID as an EventCreator
    await Promise.all(
      expenseInfo.splitDetail.map(
        async (billing): Promise<FirebaseFirestore.WriteResult> => {
          return await EventsService.createEvent(
            EventType.ExpenseCreate,
            expenseInfo,
            userID,
            billing.userID
          );
        }
      )
    );

    //* Post the expenseInfo in expense collection
    return await ExpensesRepository.postExpense(expenseInfo);
  }

  static async addExpenseToGroup(
    expenseID: string,
    groupID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    return await ExpensesRepository.addExpenseToGroup(expenseID, groupID);
  }

  static async getExpenseByGroupID(id: string): Promise<ExpenseInfoSchema[]> {
    return await ExpensesRepository.getExpenseByGroupID(id);
  }

  // Split deleteExpenseByID by two parts: delete expense in user's expense list using eventSourcing
  // and delete expense in database using normal structure
  static async deleteExpenseByID(
    userID: string,
    expenseID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const expenseInfo = await ExpensesRepository.getExpenseByID(expenseID);

    //* If group reference exists, delete the expenseID inside the group collection
    if (expenseInfo.groupReference) {
      await GroupsRepository.deleteExpenseInGroup(
        expenseInfo.expenseID,
        expenseInfo.groupReference
      );
    }

    //* For each participant, create an ExpenseDelete that includes userID as an EventCreator
    await Promise.all(
      expenseInfo.splitDetail.map(
        async (billing): Promise<FirebaseFirestore.WriteResult> => {
          return await EventsService.createEvent(
            EventType.ExpenseUndelete,
            expenseInfo,
            userID,
            billing.userID
          );
        }
      )
    );
    
    //* Delete the expense in Expense collection
    return await ExpensesRepository.deleteExpenseByID(expenseInfo.expenseID);
  }
}
