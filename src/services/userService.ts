import { supabase } from "@/lib/supabase";
import type { Tables, TablesInsert } from "@/types/supabase";

export type UsersRow = Tables<"users">;
type UsersInsert = TablesInsert<"users">;

export interface CreateUserParams {
  userId: string;
  nickname: string;
  email: string;
  phone: string;
}

export async function createUser({
  userId,
  nickname,
  email,
  phone,
}: CreateUserParams): Promise<UsersRow | null> {
  const insert: UsersInsert = {
    id: userId,
    account_id: userId,
    nickname,
    email,
    phone,
    profile: null,
  };

  const { data, error } = await supabase.from("users").insert(insert).select().single();

  if (error) {
    throw new Error("회원 정보 저장에 실패했습니다. " + error.message);
  }

  return data;
}

export async function getUserById(userId: string): Promise<UsersRow | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("사용자 정보 조회에 실패했습니다. " + error.message);
  }

  return data;
}
