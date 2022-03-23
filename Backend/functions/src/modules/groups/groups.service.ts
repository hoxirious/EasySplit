import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { EventType } from "../events/definitions/event-type.definition";
import { EventsService } from "../events/events.sevice";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { GroupsRepository } from "./groups.repository";

export class GroupService {
  static async getGroup(id: string): Promise<GroupInfoSchema> {
    return await GroupsRepository.getGroup(id);
  }

  static async createGroup(
    body: PostGroupBodyDto,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const groupID = db.groups.doc().id;
    const groupInfo: GroupInfoSchema = {
      groupID,
      expenseList: [],
      ...body,
    };

    //* Call the event repository to create a GroupCreate event
    return await EventsService.createEvent(
      EventType.GroupCreate,
      groupInfo,
      userID
    );
  }

  static async addMember(
    groupID: string,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    return await GroupsRepository.addMember(groupID, userID);
  }
}
