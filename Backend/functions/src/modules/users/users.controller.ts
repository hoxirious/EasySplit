import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { seedStuff } from "../../loaders/mocking.loader";
import { FirebaseUser } from "../../nestjs/decorators/firebase-user.decorator";
import { StreamInfoSchema } from "../../schemas/events/stream-info.schema";
import { GroupInfoSchema } from "../../schemas/groups/groupInfo.schema";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { DeleteFriendListDto } from "./dtos/delete-friendList.dto";
import { GetUserByEmailDto } from "./dtos/get-user-by-email.dto";
import { PostUserBodyDto } from "./dtos/post-user.dto";
import { ReturnUserFriendsDto } from "./dtos/return-userfriends.dto";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  @Get()
  async getUser(@FirebaseUser() user: UserRecord): Promise<UserInfoSchema> {
    console.log("Getting users...");
    return await UsersService.getUser(user.uid);
  }
  @Get("/getUserByID/:userID")
  async getUserByID(@Param("userID") userID: string): Promise<UserInfoSchema> {
    console.log("Getting users by ID...");
    return await UsersService.getUser(userID);
  }

  @Put("/createUser")
  async createUser(
    @FirebaseUser() user: UserRecord,
    @Body() body: PostUserBodyDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Creating users...");
    const userID = user.uid;
    const userInfo = {
      userID,
      ...body,
    };
    return UsersService.createUser(userInfo);
  }

  @Get("/allFriends")
  async getFriend(
    @FirebaseUser() user: UserRecord
  ): Promise<ReturnUserFriendsDto[]> {
    console.log("Getting user friends...");
    return await UsersService.getFriends(user.uid);
  }

  @Get("/findUserByEmail")
  async findUser(@Body() body: GetUserByEmailDto): Promise<UserInfoSchema> {
    console.log("Getting User by their email...");
    return await UsersService.getUserByEmail(body.email);
  }

  //Not sure if we will remove friends one by one, or get them in a group

  // body is the email of the deleting target
  @Put("/delete/friend")
  async removeFriend(
    @FirebaseUser() user: UserRecord,
    @Body() body: DeleteFriendListDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Removing user's friend...");
    return await UsersService.deleteFriend(user.uid, body.email);
  }

  @Put("/addFriend")
  async addFriend(
    @FirebaseUser() user: UserRecord,
    @Body() body: GetUserByEmailDto
  ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Adding friend...");
    const friendEmail = body.email;
    return await UsersService.addFriend(user.uid, friendEmail);
  }

  @Get("/allGroups")
  async getUserGroupsInfo(
    @FirebaseUser() user: UserRecord
  ): Promise<GroupInfoSchema[]> {
    console.log("Getting user groups...");
    return await UsersService.getUserGroupsInfo(user.uid);
  }

  @Get("/allEvents")
  async getUserEvents(
    @FirebaseUser() user: UserRecord
  ): Promise<StreamInfoSchema> {
    console.log("Getting user groups...");
    return await UsersService.getUserEvents(user.uid);
  }

  @Get("/mock-data")
  async createMockingData(): Promise<void> {
    seedStuff();
  }
}
