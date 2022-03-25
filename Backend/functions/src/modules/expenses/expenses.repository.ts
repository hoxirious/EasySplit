import { db } from "../../firebase/repository.firebase";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupsRepository } from "../groups/groups.repository";
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

  static async getExpenseByGroupID(id: string): Promise<ExpenseInfoSchema[]> {
    const expenseList: ExpenseInfoSchema[] = [];
    const expenseIDList = (await db.groups.doc(id).get()).data().expenseList;
    for (const expenseID of expenseIDList) {
      expenseList.push(await this.getExpenseByID(expenseID));
    }
    return expenseList;
  }

  static async postExpense(
    expenseInfo: ExpenseInfoSchema
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      console.log(expenseInfo.groupReference);
      const group = (await GroupsRepository.getGroup(expenseInfo.groupReference));
      group.expenseList.push(expenseInfo.expenseID);
      return (await db.expenses.doc(expenseInfo.expenseID).set(expenseInfo),
        await db.groups.doc(expenseInfo.groupReference).update({
          expenseList: group.expenseList,
        })
      )
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

  // delete the expense from the database
  static async deleteExpenseByID(
    id: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const expenseInfo = await this.getExpenseByID(id);
    try {
      return await db.expenses.doc(expenseInfo.expenseID).delete();
    } catch (error) {
      throw new Error("Cannot delete expense!");
    } 
  }
}
