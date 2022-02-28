import { Controller, Get } from "@nestjs/common";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  
  //Todos: Create custom decorator that extract JWT from the request
  @Get()
  async getUser(): Promise<UserInfoSchema> {
    console.log("Getting users...");
    return await UsersService.getUser();
  }
}
