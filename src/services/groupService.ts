import { supabase } from "@/lib/supabase";
import type { Enums, Tables, TablesInsert } from "@/types/supabase";

type GroupsRow = Tables<"groups">;
type GroupsInsert = TablesInsert<"groups">;
type GroupMembersInsert = TablesInsert<"group_members">;
type MemberRole = Enums<"member_role">;

interface GroupListParams {
  page: number;
  limit: number;
}

export async function getGroupList({
  page,
  limit,
}: GroupListParams): Promise<GroupsRow[]> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGroupByCode(code: string): Promise<GroupsRow | null> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("code", code.trim())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function isGroupMember(
  groupId: string,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("group_members")
    .select("id")
    .eq("group_id", groupId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data != null;
}

export async function createGroup({
  name,
  course,
  batch,
  code,
  creator_id,
}: TablesInsert<"groups"> & { creator_id: string }): Promise<GroupsRow> {
  const insert: GroupsInsert = {
    name,
    course: course || null,
    batch: batch ? Number(batch) : null,
    code,
    creator_id,
  };

  const { data, error } = await supabase
    .from("groups")
    .insert(insert)
    .select("*")
    .single();

  if (error) {
    throw new Error("그룹 생성 실패", { cause: error });
  }

  if (!data) {
    throw new Error("그룹 생성 실패");
  }

  return data;
}

export interface InsertGroupMemberParams {
  groupId: string;
  userId: string;
  role: MemberRole;
}

export async function insertGroupMember({
  groupId,
  userId,
  role,
}: InsertGroupMemberParams): Promise<void> {
  const insert: GroupMembersInsert = {
    group_id: groupId,
    user_id: userId,
    role,
  };

  const { error } = await supabase.from("group_members").insert(insert);

  if (error) {
    throw new Error("그룹 멤버 등록 실패", { cause: error });
  }
}

export async function hasGroupCode(code: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("groups")
    .select("id")
    .eq("code", code.trim())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data != null;
}

export async function deleteGroup(groupId: string): Promise<void> {
  const { error: membersError } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId);

  if (membersError) {
    throw new Error("그룹 멤버 삭제 실패", { cause: membersError });
  }

  const { error: groupError } = await supabase
    .from("groups")
    .delete()
    .eq("id", groupId);

  if (groupError) {
    throw new Error("그룹 삭제 실패", { cause: groupError });
  }
}
