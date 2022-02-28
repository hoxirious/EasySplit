import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
export declare const db: {
    users: FirebaseFirestore.CollectionReference<UserInfoSchema>;
};
