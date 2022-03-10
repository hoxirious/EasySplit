import { Response } from "express";
import { https } from "firebase-functions/v1";
import { NestServerInfo } from "../models/nest.model";
export declare const createNestServer: ({ expressInstance, module, }: NestServerInfo) => Promise<import("@nestjs/common").INestApplication>;
export declare const createFunction: (module: any) => (req: https.Request, res: Response<any>) => Promise<any>;
