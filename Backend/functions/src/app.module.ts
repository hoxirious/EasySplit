import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController]
})
export class AppModule {}
