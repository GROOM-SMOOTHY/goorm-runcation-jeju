import { supabase } from "@/lib/supabase";

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
}: CreateUserParams) {
  const { data, error } = await supabase.from("users").insert({
    id: userId,
    account_id: userId,
    nickname,
    email,
    phone,
    profile: null,
    created_at: new Date(),
    updated_at: new Date(),
  });

  if (error) {
    throw new Error("회원 정보 저장에 실패했습니다. " + error.message);
  }

  return data;
}

export interface UsersRow {
  id: string;
  email: string | null;
  nickname: string | null;
  phone: string | null;
  profile: string | null;
  created_at: string;
  updated_at: string;
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

  return data as UsersRow | null;
}
