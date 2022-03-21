import { Controller, Put } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
    @Put("/addMembers")
    async addMember() {}
}
