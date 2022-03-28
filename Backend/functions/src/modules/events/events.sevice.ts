import { db } from "../../firebase/repository.firebase";
import { EventInfoSchema } from "../../schemas/events/event-info.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { EventType } from "./definitions/event-type.definition";
import { EventsRepository } from "./events.repository";

const isExpenseType = (eventType: EventType): boolean =>
  eventType === EventType.ExpenseCreate ||
  eventType === EventType.ExpenseDelete ||
  eventType === EventType.ExpenseUndelete ||
  eventType === EventType.ExpenseUpdate;

export class EventsService {
  /**
   *
   * @param eventType
   * @param userLentAmount
   * @returns the corresponding balance to the EventType
   */
  static billingAction(eventType: EventType, userLentAmount: number): number {
    switch (eventType) {
      case EventType.ExpenseCreate:
        return userLentAmount;
      case EventType.ExpenseDelete:
        return -userLentAmount;
      default:
        throw new Error("event type does not support");
    }
  }

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
      //* Assert event.eventContent type into ExpenseInfoSchema
      const eventContent = event.eventContent as ExpenseInfoSchema;
      if (isExpenseType(event.eventType)) {
        //* Assert event.eventContent type into ExpenseInfoSchema to retrieve events that relates to userID
        const userBilling = eventContent.splitDetail.find(
          (user) => user.userID === userID
        );
        //* Increment the amount into currentBalance
        currentBalance += this.billingAction(
          event.eventType,
          userBilling.lentAmount
        );
      }
      return currentBalance;
    }, 0);
  }

  static async getCurrentBalanceFromGroup(
    userID: string,
    groupID: string
  ): Promise<number> {
    const userStream = await EventsRepository.getUserStream(userID);

    //* Loop through the event list to total up the current balance of the user
    return userStream.eventList.reduce<number>((currentBalance, event) => {
      //* Assert event.eventContent type into ExpenseInfoSchema
      const eventContent = event.eventContent as ExpenseInfoSchema;

      //* If event has groupReference and its type is expense
      if (
        eventContent.groupReference === groupID &&
        isExpenseType(event.eventType)
      ) {
        //*  Retrieve events that relates to userID
        const userBilling = eventContent.splitDetail.find(
          (user) => user.userID === userID
        );

        //* Increment the amount into currentBalance
        currentBalance += this.billingAction(
          event.eventType,
          userBilling.lentAmount
        );
      }
      return currentBalance;
    }, 0);
  }

  /**
   *
   * @param userID
   * @param friendID
   * @returns Get the current balance after billing calculation with the friendID
   */
  static async getCurrentBalanceFromFriend(userID: string, friendID: string) {
    const userStream = await EventsRepository.getUserStream(userID);
    //* Loop through the event list to total up the current balance of the user
    return userStream.eventList.reduce<number>((currentBalance, event) => {
      //* Assert event.eventContent type into ExpenseInfoSchema
      const eventContent = event.eventContent as ExpenseInfoSchema;

      //* If event has groupReference and its type is expense
      if (isExpenseType(event.eventType)) {
        //*  Retrieve billing that relates to userID
        const userBilling = eventContent.splitDetail.find(
          (user) => user.userID === userID
        );

        //*  Retrieve billing that relates to friendID
        const friendBilling = eventContent.splitDetail.find(
          (user) => user.userID === friendID
        );

        //* Increment the amount into currentBalance
        currentBalance += this.billingAction(
          event.eventType,
          userBilling.lentAmount + friendBilling.lentAmount
        );
      }
      return currentBalance;
    }, 0);
  }

  static async createEvent(
    eventType: EventType,
    eventContent: GroupInfoSchema | ExpenseInfoSchema,
    eventCreator: string,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult|void> {
    const timestamp = new Date().toLocaleString();
    const eventID = db.events.doc().id;
    const eventPayload: EventInfoSchema = {
      timestamp,
      eventID,
      eventCreator,
      eventContent,
      eventType,
    };
    return await EventsRepository.postEvent(userID, eventPayload);
  }

  static async revertDeletion(userID: string, eventID: string): Promise<void> {}
}
