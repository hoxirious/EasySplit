import { https } from "firebase-functions";
import { createFunction } from "./loaders/functions.loader";
import { UsersModule } from "./modules/users/users.module";


export const users = https.onRequest(createFunction(UsersModule));