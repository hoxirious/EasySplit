import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { PostUserReqDto } from "./dtos/post-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  // add jwt in parameter
  @Get()
  async getUser(): Promise<UserInfoSchema> {
    console.log("Getting users...")
    return await UsersService.getUser();
  }

  @Post()
  async createUser(@Body() req: PostUserReqDto): Promise<void> {}
}
