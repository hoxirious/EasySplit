import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserRecord } from "firebase-functions/v1/auth";
import { PostGroupBodyDto } from './dtos/post-group.dto';
import { FirebaseUser } from '../../nestjs/decorators/firebase-user.decorator';
import { GroupService } from './groups.service';
import { AddMemberDto } from './dtos/add-member.dto';
import { GroupInfoSchema } from '../../schemas/groups/groupInfo.schema';
import { GetGroupDto } from './dtos/get-group.dto';

@Controller("group")
export class GroupsController {
    @Get("/getGroup")
    async getGroup(@Body() body: GetGroupDto): Promise<GroupInfoSchema> {
        console.log("Getting group...");
        return await GroupService.getGroup(body.groupID);
    }
    
    @Put("/createGroup")
    async createGroup(
        @FirebaseUser() user: UserRecord,
        @Body() body: PostGroupBodyDto
    ): Promise<FirebaseFirestore.WriteResult> {
        console.log("Creating group...");
        const userID = user.uid;
        console.log(userID);
        const groupInfo = {
            ...body,
        }
        return GroupService.createGroup(groupInfo, userID);
    }

    @Put("/addMember")
    async addMember(@Body() body: AddMemberDto): Promise<FirebaseFirestore.WriteResult> {
        console.log("Add new member...");
        return await GroupService.addMember(body.groupID, body.userID);
    }

    @Put("/removeMember")
    async removeMember(@Body() body: AddMemberDto): Promise<FirebaseFirestore.WriteResult> {
        console.log("Remove an existing member...");
        return await GroupService.removeMember(body.groupID, body.userID);
    }
}
