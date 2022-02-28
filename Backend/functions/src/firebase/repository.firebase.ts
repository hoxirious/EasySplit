import * as admin from "firebase-admin";
import { UserInfoSchema } from "src/schemas/users/userInfo.schema";

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot): T =>
    snap.data() as T,
});

export const dataPoint = <T>(collectionPath: string) =>
  firestoreDb.collection(collectionPath).withConverter(converter<T>());

export const db = {
  users: dataPoint<UserInfoSchema>("users/"),
};
