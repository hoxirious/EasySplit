import * as admin from "firebase-admin";
import { UserInfoSchema } from "../schemas/users/userInfo.schema";

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();

// Generic Data Converter that helps send/read data
const universalConverter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot): T =>
    snap.data() as T,
});

export const dataPoint = <T>(collectionPath: string) =>
  firestoreDb.collection(collectionPath).withConverter(universalConverter<T>());

export const db = {
  users: dataPoint<UserInfoSchema>("users/"),
};
