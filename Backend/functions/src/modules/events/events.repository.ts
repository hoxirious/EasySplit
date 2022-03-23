import { db } from "../../firebase/repository.firebase";
import { EventInfoSchema } from "../../schemas/events/event-info.schema";
import { StreamInfoSchema } from "../../schemas/events/stream-info.schema";
import { firestore } from "firebase-admin";

export class EventsRepository {
  static async getUserStream(userID: string): Promise<StreamInfoSchema[]> {
    try {
      return (await db.events.doc(userID).get()).data();
    } catch (error) {
      throw new Error("error: cannot get user's stream");
    }
  }

  static async postEvent(userID: string, eventPayload: EventInfoSchema) {
    try {
      await db.events.doc(userID).update({
        events: firestore.FieldValue.arrayUnion(eventPayload)
      })
    } catch (error) {
      throw new Error("error: cannot post new event into user stream!");
    }
  }
  static async dispatchAction(userID: string, eventPayload: EventInfoSchema) {}
}