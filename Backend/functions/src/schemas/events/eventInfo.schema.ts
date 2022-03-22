import { EventType } from "../../modules/events/definitions/event-type.definition";

export interface EventInfoSchema {
  eventID: string;
  eventType: EventType;
  eventContent: GroupContentSchema | ExpenseContentSchema;
  timestamp: string;
}

export interface GroupContentSchema {}
export interface ExpenseContentSchema {}
