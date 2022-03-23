import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express = require("express");
import { Response } from "express";
import { https } from "firebase-functions/v1";
import { NestServerInfo } from "../models/nest.model";

//* Create nest server for given function
export const createNestServer = async ({
  expressInstance,
  module,
}: NestServerInfo) => {
  const app = await NestFactory.create(
    module,
    new ExpressAdapter(expressInstance),
    { logger: ["error", "warn"] }
  );
  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  return app.init();
};


//* Create Function 
export const createFunction =
  (module: any) =>
  async (req: https.Request, res: Response<any>): Promise<any> => {
    const server = express();
    const nestInstance: NestServerInfo = {
      expressInstance: server,
      module,
    };
    await createNestServer(nestInstance);
    return server(req, res);
  };
