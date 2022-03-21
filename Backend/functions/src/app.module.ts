import { Module } from "@nestjs/common";
import { ExpensesModule } from "./modules/expenses/expenses.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [ExpensesModule, UsersModule]
})
export class AppModule {}