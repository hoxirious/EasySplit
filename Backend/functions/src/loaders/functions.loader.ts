import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { NestServerInfo } from "src/models/nest.model";
import express = require("express");
import { Response } from "express";
import { https } from "firebase-functions/v1";

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
  app.enableCors();
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
