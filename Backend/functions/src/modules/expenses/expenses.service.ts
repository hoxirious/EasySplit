import { db } from "../../firebase/repository.firebase";
import { BillingInfoSchema } from "../../schemas/expenses/billingInfo.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { EventType } from "../events/definitions/event-type.definition";
import { EventsService } from "../events/events.sevice";
import { GroupsRepository } from "../groups/groups.repository";
import { ExpenseState } from "./definitions/expenses-info.definition";
import { GetSplitBillingBodyPayment } from "./dtos/get-splitBillingPayment.dto";
import { PostExpenseBodyDto } from "./dtos/post-expense.dto";
import { ExpensesRepository } from "./expenses.repository";

export class ExpensesService {
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
    return await ExpensesRepository.putExpense(expenseInfo);
  }
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

  static async getExpenseByGroupID(id: string): Promise<ExpenseInfoSchema[]> {
    return await ExpensesRepository.getExpenseByGroupID(id);
  }

  // Split deleteExpenseByID by two parts: delete expense in user's expense list using eventSourcing
  // and delete expense in database using normal structure
  static async deleteExpenseByID( 
    expenseID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const expenseDel = await ExpensesRepository.getExpenseByID(expenseID);

    if ( await GroupsRepository.getGroup(expenseDel.groupReference) === undefined ||
        await GroupsRepository.getGroup(expenseDel.groupReference) === null) 
    {
      const usersBill = expenseDel.splitDetail;
      for (const eachBill of usersBill) {
        await EventsService.createEvent(
          EventType.ExpenseDelete,
          expenseDel,
          eachBill.userID
        );
      }
    }
    else {
      const groupDel = await GroupsRepository.getGroup(expenseDel.groupReference);
      const memList = groupDel.memberList;
      for (const mem of memList) {
        await EventsService.createEvent(
          EventType.ExpenseDelete,
          expenseDel,
          mem
        );
      }
    }
    
    return await ExpensesRepository.deleteExpenseByID(expenseID);
  }
}

// body.userList.forEach((userID) => {
//   if (userID === body.paidBy) {
//     const userBilling: BillingInfoSchema = {
//       userID,
//       paidAmount: body.totalAmount,
//       lentAmount: body.totalAmount / body.userList.length,
//     };
//     billingReturn.push(userBilling);
//   } else {
//     const userBilling: BillingInfoSchema = {
//       userID,
//       paidAmount: 0,
//       lentAmount: -body.totalAmount / body.userList.length,
//     };
//     billingReturn.push(userBilling);
//   }
// });
