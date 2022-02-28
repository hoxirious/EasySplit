import { Express } from "express";

export interface NestServerInfo {
  expressInstance: Express;
  module: any;
}
