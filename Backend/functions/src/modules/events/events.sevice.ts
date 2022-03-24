import { db } from "../../firebase/repository.firebase";
import {
  EventInfoSchema
} from "../../schemas/events/event-info.schema";
import { ExpenseInfoSchema } from "../../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { EventType } from "./definitions/event-type.definition";
import { EventsRepository } from "./events.repository";

export class EventsService {
  static async getCurrentBalance(userID: string): Promise<number> {
    return 0;
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
