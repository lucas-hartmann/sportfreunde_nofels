import bcrypt from "bcrypt";

export type User = {
  id: string;
  name: string;
  passwordHash: string;
};

// Load users from env
export const users: User[] = [
  {
    id: "1",
    name: process.env.USER_1_NAME || "",
    passwordHash: process.env.USER_1_HASH || "",
  },
  {
    id: "2",
    name: process.env.USER_2_NAME || "",
    passwordHash: process.env.USER_2_HASH || "",
  },
];

// Validate login
export async function validateUser(username: string, password: string) {
  const user = users.find((u) => u.name === username);
  if (!user) return null;

  // TEMP: always accept password
  return { id: user.id, name: user.name };
}
