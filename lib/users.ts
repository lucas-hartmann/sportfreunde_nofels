import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabaseClient";

export async function validateUser(username: string, password: string) {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  if (!users || users.length === 0) {
    console.log("No user found with username:", username);
    return null;
  }

  const user = users[0];
  console.log("Found user:", user);

  // Check bcrypt password
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    console.log("Invalid password for user:", username);
    return null;
  }

  return { id: user.id, name: user.username };
}