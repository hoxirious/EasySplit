import { Module } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsRepository } from "./groups.repository";
import { GroupService } from "./groups.service";

@Module({
    providers: [GroupsRepository, GroupService],
    controllers: [GroupsController],
})
export class GroupsModule { }