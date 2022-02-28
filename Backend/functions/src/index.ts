import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as functions from "firebase-functions";
import { UsersModule } from "./modules/users/users.module";

import express = require("express");

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyDuqfN8W85SXnYiG-7dL3TVw8lBT49UelY",

  authDomain: "easy-split-g28.firebaseapp.com",

  projectId: "easy-split-g28",

  storageBucket: "easy-split-g28.appspot.com",

  messagingSenderId: "649693199776",

  appId: "1:649693199776:web:ab133727306fb7585cf8c5",
};


const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    UsersModule,
    new ExpressAdapter(expressInstance)
  );
  return app.init();
};


createNestServer(server)
  .then((v) => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export const users = functions.https.onRequest(server);
