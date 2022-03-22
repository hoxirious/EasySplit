import * as admin from "firebase-admin";
import { ExpenseInfoSchema } from "../schemas/expenses/expenseInfo.schema";
import { GroupInfoSchema } from "../schemas/groups/groupInfo.schema";
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
  expenses: dataPoint<ExpenseInfoSchema>("expenses/"),
  groups: dataPoint<GroupInfoSchema>("groups/"),
};
