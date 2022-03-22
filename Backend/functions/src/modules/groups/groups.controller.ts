import { Body, Controller, Put } from '@nestjs/common';
import { UserRecord } from "firebase-functions/v1/auth";
import { PostGroupBodyDto } from './dtos/post-group.dto';
import { FirebaseUser } from '../../nestjs/decorators/firebase-user.decorator';
import { GroupService } from './groups.service';

@Controller("group")
export class GroupsController {
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
}
