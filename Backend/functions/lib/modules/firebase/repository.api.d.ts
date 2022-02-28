import { firestore } from "firebase-admin";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";
export declare class FirestoreService {
    static converter: <T>() => {
        toFirestore: (data: T) => T;
        fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => T;
    };
    static dataPoint: <T>(collectionPath: string) => firestore.CollectionReference<T>;
    static db: {
        users: firestore.CollectionReference<UserInfoSchema>;
    };
}
