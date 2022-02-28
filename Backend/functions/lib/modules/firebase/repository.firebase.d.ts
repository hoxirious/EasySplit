import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
export declare const dataPoint: <T>(collectionPath: string) => FirebaseFirestore.CollectionReference<T>;
export declare const db: {
    users: FirebaseFirestore.CollectionReference<UserInfoSchema>;
};
