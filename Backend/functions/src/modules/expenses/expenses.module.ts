import { Module } from "@nestjs/common";
import { ExpensesController } from "./expenses.controller";
import { ExpensesRepository } from "./expenses.repository";
import { ExpensesService } from "./expenses.service";
@Module({
  providers: [ExpensesRepository, ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
