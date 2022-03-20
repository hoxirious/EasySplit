import * as admin from "firebase-admin";

import { UsersRepository } from "../modules/users/users.repository";
import { UserInfoSchema } from "../schemas/users/userInfo.schema";

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
    },
  },
];

const seedUser = async () => {
  const auth = admin.auth();
  await Promise.all(
    mockerUserList.map(async (user) => {
      const uid = (await auth.createUser(user.account)).uid;
      const userInfo: UserInfoSchema = {
        ...user.info,
        userID: uid,
      };
      await UsersRepository.postUser(userInfo);
    })
  );
};

export const seedStuff = async () => {
  console.info("seeding...");
  await seedUser();
  console.info("seeding done o.O");
};
