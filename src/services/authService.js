const USERS_KEY = "textEditorUsers";
const CURRENT_USER_KEY = "textEditorCurrentUser";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const registerUser = (username, password) => {
  const users = getUsers();

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return { success: false, message: "שם המשתמש כבר קיים" };
  }

  const newUser = { username, password };
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  return { success: true, user: newUser };
};

export const loginUser = (username, password) => {
  const users = getUsers();

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    return { success: false, message: "שם משתמש או סיסמה שגויים" };
  }

  saveCurrentUser(foundUser);
  return { success: true, user: foundUser };
};