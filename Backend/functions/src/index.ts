import { https } from "firebase-functions";
import { createFunction } from "./loaders/functions.loader";
import { seedStuff } from "./loaders/mocking.loader";
import { UsersModule } from "./modules/users/users.module";

// * Initialize App

seedStuff();
//* Create user function
export const users = https.onRequest(createFunction(UsersModule));
