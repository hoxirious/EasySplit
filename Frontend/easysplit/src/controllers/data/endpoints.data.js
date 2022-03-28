export const baseURL = "http://localhost:5001/easy-split-g28/us-central1";

export const ENDPOINTS = {
  users: {
    getUser: "/users/user",
    getUserByID: "/users/user/getUserByID/",
    getUserEvents: "/users/user/allEvents",
    createUser: "/users/user",
    deleteFriend: "/users/user",
    getUserAllGroups: "/users/user/allGroups",
    getUserAllFriends: "/users/user/allFriends"
  },
  groups: {
    getAllGroup: "/groups/allgroup",
    addGroup: "/groups/addgroup",
  },
  expenses: {
    getExpenseByGroupID: "/expenses/expense/getExpenseByGroup/",
    getExpenseByUserID: "/expenses/expense/getExpenseByUserID",
    getExpenseWithFriend: "/expenses/expense/getExpenseWithFriend/",
  }
};
