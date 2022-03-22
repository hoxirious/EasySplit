import { EventInfoSchema } from "../../schemas/events/eventInfo.schema";

export class EventsRepository {
  static async getUserStream(userID: string) {}
  static async postEvent(userID: string, eventPayload: EventInfoSchema) {}
  static async dispatchAction(userID: string, eventPayload: EventInfoSchema){}
}
