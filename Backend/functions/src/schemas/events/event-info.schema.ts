import { EventType } from "../../modules/events/definitions/event-type.definition";
import { ExpenseInfoSchema } from "../expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../groups/groupInfo.schema";

export interface EventInfoSchema {
  eventID: string;
  eventType: EventType;
  eventContent: GroupInfoSchema | ExpenseInfoSchema;
  timestamp: string;
}

export interface GroupContentSchema extends GroupInfoSchema {}
export interface ExpenseContentSchema {}
