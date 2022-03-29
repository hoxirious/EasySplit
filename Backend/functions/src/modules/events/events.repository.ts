import { firestore } from "firebase-admin";
import { db } from "../../firebase/repository.firebase";
import { EventInfoSchema } from "../../schemas/events/event-info.schema";
import { StreamInfoSchema } from "../../schemas/events/stream-info.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { GroupsRepository } from "../groups/groups.repository";
import { UsersRepository } from "../users/users.repository";
import { EventType } from "./definitions/event-type.definition";

export class EventsRepository {
  static async getUserStream(userID: string): Promise<StreamInfoSchema> {
    try {
      return (
        (await db.events.doc(userID).get()).data() ?? {
          currentBalance: 0,
          eventList: [],
        }
      );
    } catch (error) {
      throw new Error("error: cannot get user's stream");
    }
  }

  /**
   *
   * @param userID
   * @param eventPayload event information
   * @returns Post a new event to user stream
   */
  static async postEvent(
    userID: string,
    eventPayload: EventInfoSchema
  ): Promise<firestore.WriteResult | void> {
    try {
      //* DocumentReference that has document ID of userID
      const streamRef = db.events.doc(userID);

      //* If the DocumentRefence exists, append new event into the stream and dispatch the action
      if ((await streamRef.get()).exists) {
        return (
          // Append the eventPayload into the events array
          await streamRef.update({
            eventList: firestore.FieldValue.arrayUnion(eventPayload),
          }),
          // Dispatch the event payload
          await this.dispatchAction(userID, eventPayload)
        );
      }
      //* Otherwise, create new eventList and dispatch the action
      else {
        const eventList: EventInfoSchema[] = [eventPayload];
        return (
          await streamRef.set({
            currentBalance: 0,
            eventList,
          }),
          await this.dispatchAction(userID, eventPayload)
        );
      }
    } catch (error) {
      throw new Error("error: cannot post new event into user stream!");
    }
  }

  /**
   *
   * @param userID
   * @param eventPayload
   * @returns route the action to the right repository
   */
  static async dispatchAction(
    userID: string,
    eventPayload: EventInfoSchema
  ): Promise<firestore.WriteResult | void> {
    const expenseInfo = eventPayload.eventContent as ExpenseInfoSchema;
    const groupInfo = eventPayload.eventContent as GroupInfoSchema;
    switch (eventPayload.eventType) {
      case EventType.ExpenseCreate:
        return await UsersRepository.addExpenseToUser(expenseInfo, userID);
      case EventType.ExpenseDelete:
        return await UsersRepository.deleteExpenseInUser(
          expenseInfo.expenseID,
          userID
        );
      // case EventType.ExpenseUndelete:
      //   break;
      case EventType.ExpenseUpdate:
        break;
      //* EventType is GroupCreate -> Call postGroups from GroupsRepository
      case EventType.GroupCreate:
        return await GroupsRepository.postGroups(
          eventPayload.eventContent as GroupInfoSchema,
          userID
        );
      case EventType.GroupDelete:
        return await UsersRepository.deleteGroupInUser(
          groupInfo.groupID,
          userID
        );
      // case EventType.GroupRevert:
      //   break;
      // case EventType.GroupUpdate:
      //   break;
      default:
        throw new Error("action does not exist");
    }
  }
}
