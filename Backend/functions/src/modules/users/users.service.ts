import { UserInfoSchema } from "../../schemas/users/userInfo.schema";
import { PostUserServiceDto } from "./dtos/post-user.dto";
import { UsersRepository } from "./users.repository";

export class UsersService {
  static async getUser(id: string): Promise<UserInfoSchema> {
    return await UsersRepository.getUser(id);
  }

  static async getUserByEmail(email: string): Promise<UserInfoSchema> {
    return await UsersRepository.getUserByEmail(email);
  }

  static async createUser(
    user: PostUserServiceDto,
  ): Promise<FirebaseFirestore.WriteResult> {

    const userInfo: UserInfoSchema= {
      ...user,
      friendList: [],
      groupList: [] ,
      expenseList: [],
    }
    return await UsersRepository.postUser(userInfo);
  }

  //Calls the getUser() method to retrieve user and then retrieves users friendslist
  static async getFriends(id: string): Promise<string[]> {
    return (await UsersRepository.getUser(id)).friendList;
  }


  static async deleteFriend(
    userID: string,
    email: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    const target = this.getUserByEmail(email);
    //repository sending my userID and target.userID
    return await UsersRepository.deleteFriend(userID, (await target).userID);
  }
  static async addFriend(
    id: string,
    friendEmail: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    return await UsersRepository.addFriend(id, friendEmail);
  }

  //receives info from users controller
  //sends info to users.repository.ts which deals with the database
  static async deleteGroup(
    userID: string,
    groupId: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    return await UsersRepository.deleteGroup(userID, groupId);
  }
}
