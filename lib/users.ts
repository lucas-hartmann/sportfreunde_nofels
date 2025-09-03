// lib/users.ts
import bcrypt from "bcrypt";
import { supabaseServer } from "@/lib/supabaseServerClient";

export async function validateUser(username: string, password: string) {
  const { data: users, error } = await supabaseServer
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

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    console.log("Invalid password for user:", username);
    return null;
  }

  return { id: user.id, name: user.username };
}
