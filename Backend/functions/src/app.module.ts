import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { AuthController } from './modules/auth/auth.controller';
import { GroupsController } from './modules/groups/groups.controller';

@Module({
  controllers: [UsersController, AuthController, GroupsController]
})
export class AppModule {}
