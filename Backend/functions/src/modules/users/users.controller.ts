import { Body, Controller, Get, Put } from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { FirebaseUser } from "../../nestjs/decorators/firebase-user.decorator";
import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { GetUserByEmailDto } from "./dtos/get-user-by-email.dto";
import { PostUserBodyDto } from "./dtos/post-user.dto";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {

  @Get()
  async getUser(@FirebaseUser() user: UserRecord): Promise<UserInfoSchema> {
    console.log("Getting users...");
    return await UsersService.getUser(user.uid);
  }

  @Put()
  async createUser( @FirebaseUser() user: UserRecord, @Body() body: PostUserBodyDto ): Promise<FirebaseFirestore.WriteResult> {
    console.log("Creating users...");
    const userID = user.uid;
    const userInfo = {
      userID,
      ...body,
    };
    return UsersService.createUser(userInfo);
  }

  @Get("/allFriends")
  async getFriend(@FirebaseUser() user: UserRecord): Promise<string[]>{
    console.log("Getting user friends...");
    return await UsersService.getFriends(user.uid);
  }

  @Get("/findUserByEmail")
  async findUser(@Body() body: GetUserByEmailDto): Promise<UserInfoSchema> {
    console.log("Getting User by their email...");
    return await UsersService.getUserByEmail(body.userEmail);
  }

  //Not sure if we will remove friends one by one, or get them in a group

  // body is the email of the deleting target
  @Delete("/delete/friend")
  async removeFriend(@FirebaseUser() user: UserRecord, @Body() body: string): Promise<FirebaseFirestore.WriteResult>{
    console.log("Removing user's friend...");
    return await UsersService.deleteFriend(user.id, body);
  }

}
