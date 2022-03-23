import { db } from "../../firebase/repository.firebase";
import { EventInfoSchema } from "../../schemas/events/eventInfo.schema";

export class EventsRepository {
  static async getUserStream(userID: string): Promise<EventInfoSchema[]> {
    try {
      return (await db.events.doc(userID).get()).data();
    } catch (error) {
      throw new Error("error: cannot retrieve user stream");
    }
  }

  static async postEvent(userID: string, eventPayload: EventInfoSchema) {}
  static async dispatchAction(userID: string, eventPayload: EventInfoSchema) {}
}
