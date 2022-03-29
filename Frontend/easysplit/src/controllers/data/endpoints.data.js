export const baseURL = "http://localhost:5001/easy-split-g28/us-central1";

export const ENDPOINTS = {
  users: {
    getUser: "/users/user",
    getUserByID: "/users/user/getUserByID/",
    getUserEvents: "/users/user/allEvents",
    createUser: "/users/user/createUser",
    addFriend: "/users/user/addFriend",
    deleteFriend: "/users/user",
    getUserAllGroups: "/users/user/allGroups",
    getUserAllFriends: "/users/user/allFriends",
  },
  groups: {
    createGroup: "/groups/group/createGroup",
  },
  expenses: {
    getExpenseByGroupID: "/expenses/expense/getExpenseByGroup/",
    getExpenseByUserID: "/expenses/expense/getExpenseByUserID",
    getExpenseWithFriend: "/expenses/expense/getExpenseWithFriend/",
    getCurrentBalanceFromFriend: "/expenses/expense/fromFriend/",
    createExpense: "/expenses/expense/createExpense",
    splitExpense: "/expenses/expense/splitExpense",
    deleteExpenseByID: "/expenses/expense/delete/",
    getFriendDebt: "/expenses/expense/friendDebt",
    getGroupDebt: "/expenses/expense/groupDebt/",
  },
};
