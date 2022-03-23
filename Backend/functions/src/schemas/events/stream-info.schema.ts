import { EventInfoSchema } from "./event-info.schema";

export interface StreamInfoSchema {
  currentBalance: number;
  eventList: EventInfoSchema[];
}
