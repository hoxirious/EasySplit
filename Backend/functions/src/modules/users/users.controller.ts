import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRecord } from "firebase-functions/v1/auth";
import { FirebaseUser } from "src/nestjs/decorators/firebase-user.decorator";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { PostUserBodyDto } from "./dtos/post-user.dto";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  //Todos: Create custom decorator that extract JWT from the request
  @Get()
  async getUser(): Promise<UserInfoSchema> {
    console.log("Getting users...");
    return await UsersService.getUser();
  }

  @Post()
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
}
