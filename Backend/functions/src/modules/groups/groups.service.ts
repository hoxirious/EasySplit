import { db } from "../../firebase/repository.firebase";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { EventType } from "../events/definitions/event-type.definition";
import { EventsService } from "../events/events.service";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { GroupsRepository } from "./groups.repository";
import { UsersRepository } from "../users/users.repository";

export class GroupService {
  static async getGroup(id: string): Promise<GroupInfoSchema> {
    return await GroupsRepository.getGroup(id);
  }

  static async createGroup(
    body: PostGroupBodyDto,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult | void> {
    const groupID = db.groups.doc().id;
    const groupInfo: GroupInfoSchema = {
      groupID,
      expenseList: [],
      memberList: [userID],
      ...body,
    };

    //* Call the event repository to create a GroupCreate event
    return await EventsService.createEvent(
      EventType.GroupCreate,
      groupInfo,
      userID,
      userID
    );
  }

  static async addMember(
    groupID: string,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    return await GroupsRepository.addMember(groupID, userID);
  }

  static async removeMember(
    groupID: string,
    userID: string
  ): Promise<FirebaseFirestore.WriteResult> {
    const group = await GroupsRepository.getGroup(groupID);
    const user = await UsersRepository.getUser(userID);

    const userIndex = group.memberList.indexOf(userID);
    const groupIndex = user.groupList.indexOf(groupID);

    if (userIndex > -1 && groupIndex > -1) {
      group.memberList.splice(userIndex, 1);
      user.groupList.splice(groupIndex, 1);
    }

    return (
      await db.groups.doc(group.groupID).update({
        memberList: group.memberList,
      }),
      await db.users.doc(user.userID).update({
        groupList: user.groupList,
      })
    );
  }

  static async deleteGroup(
    userID: string,
    groupID: string
  ): Promise<FirebaseFirestore.WriteResult | void> {
    const groupInfo = await this.getGroup(groupID);

    //* For each participant, create an GroupDelete that includes userID as an EventCreator
    await Promise.all(
      groupInfo.memberList.map(
        async (memberID): Promise<FirebaseFirestore.WriteResult | void> => {
          return await EventsService.createEvent(
            EventType.GroupDelete,
            groupInfo,
            userID,
            memberID
          );
        }
      )
    );

    return await GroupsRepository.deleteGroup(userID, groupID);
  }
}
