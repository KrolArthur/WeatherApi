export const users_query = "SELECT id, username, email, create_date FROM user";

export const login_query = "SELECT id, username, email, create_date FROM user WHERE username = ? AND password = ?"

export const user_create_query = "INSERT INTO user (username, email, password, create_date) VALUES (?, ?, ?, ?);";

export const user_query = "SELECT id, username, email, create_date FROM user WHERE id = ?";

export const user_delete_query = "DELETE FROM user WHERE id = ?";
