import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
@Module({
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
