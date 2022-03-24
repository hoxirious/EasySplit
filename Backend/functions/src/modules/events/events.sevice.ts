import { db } from "../../firebase/repository.firebase";
import { EventInfoSchema } from "../../schemas/events/event-info.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { EventType } from "./definitions/event-type.definition";
import { EventsRepository } from "./events.repository";

export class EventsService {

  /**
   * 
   * @param userID 
   * @returns The current balance of userID for all expenses 
   */
  static async getCurrentBalanceFromAllExpenses(
    userID: string
  ): Promise<number> {
    const userStream = await EventsRepository.getUserStream(userID);

    //* Loop through the event list to total up the current balance of the user
    return userStream.eventList.reduce<number>((currentBalance, event) => {
      if (
        event.eventType === EventType.ExpenseCreate ||
        event.eventType === EventType.ExpenseDelete ||
        event.eventType === EventType.ExpenseUndelete ||
        event.eventType === EventType.ExpenseUpdate
      ) {
        //* Assert event.eventContent type into ExpenseInfoSchema to retrieve events that relates to userID
        const userBilling = (
          event.eventContent as ExpenseInfoSchema
        ).splitDetail.find((user) => user.userID === userID);

        //* Increment the amount into currentBalance
        currentBalance += userBilling.lentAmount;
      }
      return currentBalance;
    }, 0);
  }

  static async createEvent(
    eventType: EventType,
    eventContent: GroupInfoSchema | ExpenseInfoSchema,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const timestamp = new Date().toLocaleString();
    const eventID = db.events.doc().id;
    const eventPayload: EventInfoSchema = {
      timestamp,
      eventID,
      eventContent,
      eventType,
    };
    return await EventsRepository.postEvent(userID, eventPayload);
  }

  static async revertDeletion(userID: string, eventID: string): Promise<void> {}
}
