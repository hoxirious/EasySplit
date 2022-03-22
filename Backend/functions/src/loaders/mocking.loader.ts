import * as admin from "firebase-admin";

import { UsersRepository } from "../modules/users/users.repository";
import { UserInfoSchema } from "../schemas/users/userInfo.schema";

// Mocking users
const mockerUserList = [
  {
    account: {
      email: "test1@gmail.com",
      password: "123456",
    },
    info: {
      email: "test1@gmail.com",
      name: "Test1",
      friendList: [],
      groupList: [],
      expenseList: [],
    },
  },
  {
    account: {
      email: "test2@gmail.com",
      password: "123456",
    },
    info: {
      email: "test2@gmail.com",
      name: "Test2",
      friendList: [],
      groupList: [],
      expenseList: [],
    },
  },
  {
    account: {
      email: "test3@gmail.com",
      password: "123456",
    },
    info: {
      email: "test3@gmail.com",
      name: "Test3",
      friendList: [],
      groupList: [],
      expenseList: [],
    },
  },
  {
    account: {
      email: "test4@gmail.com",
      password: "123456",
    },
    info: {
      email: "test4@gmail.com",
      name: "Test4",
      friendList: [],
      groupList: [],
      expenseList: [],
    },
  },
];

// Seeding mocking users
const seedUser = async () => {
  const auth = admin.auth();
  await Promise.all(
    mockerUserList.map(async (user) => {
      // Create user on Firebase auth with email and password
      const uid = (await auth.createUser(user.account)).uid;

      // Add user id into user data
      const userInfo: UserInfoSchema = {
        ...user.info,
        userID: uid,
      };
      
      // Create user
      await UsersRepository.postUser(userInfo);
    })
  );
};

// Seeding mocking data
export const seedStuff = async () => {
  console.info("seeding...");
  
  await seedUser();
  console.info("seeding done o.O");
};
