import { UserRecord } from "firebase-functions/v1/auth";
import { PostGroupBodyDto } from './dtos/post-group.dto';
export declare class GroupsController {
    createGroup(user: UserRecord, body: PostGroupBodyDto): Promise<FirebaseFirestore.WriteResult>;
}
