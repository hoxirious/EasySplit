import { https } from "firebase-functions";
import { createFunction } from "./loaders/functions.loader";
import { ExpensesModule } from "./modules/expenses/expenses.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { UsersModule } from "./modules/users/users.module";



// seedStuff();
//* Create user function
export const users = https.onRequest(createFunction(UsersModule));
export const expenses = https.onRequest(createFunction(ExpensesModule));
export const groups = https.onRequest(createFunction(GroupsModule))
