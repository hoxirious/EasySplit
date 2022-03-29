import { Body, Controller, Get, Put } from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { FirebaseUser } from "../../nestjs/decorators/firebase-user.decorator";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { DeleteGroupDto } from "../users/dtos/delete-group.dto";
import { AddMemberDto } from "./dtos/add-member.dto";
import { GetGroupDto } from "./dtos/get-group.dto";
import { PostGroupBodyDto } from "./dtos/post-group.dto";
import { RemoveMemberDto } from "./dtos/remove-member.dto";
import { GroupService } from "./groups.service";

@Controller("group")
export class GroupsController {
  @Get("/getGroup")
  async getGroup(@Body() body: GetGroupDto): Promise<GroupInfoSchema> {
    console.log("Getting group...");
    return await GroupService.getGroup(body.groupID);
  }

  @Put("/createGroup")
  async createGroup(
    @FirebaseUser() user: UserRecord,
    @Body() body: PostGroupBodyDto
  ): Promise<FirebaseFirestore.WriteResult | void> {
    console.log("Creating group...");
    const userID = user.uid;
    console.log(userID);
    const groupInfo = {
      ...body,
    };
    return GroupService.createGroup(groupInfo, userID);
  }

  @Put("/addMember")
  async addMember(
    @Body() body: AddMemberDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Add new member...");
    return await GroupService.addMember(body.groupID, body.userID);
  }

  @Put("/removeMember")
  async removeMember(
    @Body() body: RemoveMemberDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Remove an existing member...");
    return await GroupService.removeMember(body.groupID, body.userID);
  }

  //deleteGroup fucntion, allows users to remove the group for all users in group
  @Put("/deleteGroup")
  static async deleteGroup(
    @FirebaseUser() user: UserRecord,
    @Body() body: DeleteGroupDto
  ): Promise<FirebaseFirestore.WriteResult | void> {
    console.log("Deleting group...");

    //calls deleteGroup() in UsersService class, passes the user's ID and ID of group that wants to be deleted
    return await GroupService.deleteGroup(user.uid, body.groupID);
  }
}
