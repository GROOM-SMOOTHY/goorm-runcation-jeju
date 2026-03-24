import styles from "@/pages/MyPage/MyPage.module.css";
import Header from "@/components/layout/Header/Header";
import MyProfilePicture from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture";
import TipBox from "@/components/pages/Mypage/TipBox/TipBox";
import Button from "@/components/common/Button/Button";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Input from "@/components/common/Input/Input";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useGroup, useUser } from "@/store";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import { deleteUser } from "@/services/authService";
import type { Tables } from "@/types/supabase";
import { uploadImage } from "@/utils/supabase/storage";

export default function MyPage() {
  const { id: userId } = useUser();
  const { group } = useGroup();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [depositor, setDepositor] = useState("");

  const isValid =
    name.trim() &&
    tel.trim() &&
    bank.trim() &&
    account.trim() &&
    depositor.trim();

  const [userInfo, setUserInfo] = useState<Tables<"users"> | null>(null);

  const addToast = useToastStore((state) => state.addToast);
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setUserInfo(data);
      setName(data.nickname ?? "");
      setTel(data.phone ?? "");
    };

    const fetchAccount = async () => {
      const { data, error } = await supabase
        .from("account_infos")
        .select("*")
        .eq("user_id", userId)
        .eq("group_id", group?.id)
        .maybeSingle();

      if (error || !data) return;

      setBank(data.bank_name ?? "");
      setAccount(data.account_number ?? "");
      setDepositor(data.account_holder ?? "");
    };

    fetchUser();
    fetchAccount();
  }, [userId]);

  const onClick = async () => {
    const { data } = await supabase.auth.getUser();
    const authId = data.user?.id;
    if (!authId) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!isValid) {
      addToast("모든 정보를 입력해주세요", "", "warning");
      return;
    }
    try {
      const { error: userError } = await supabase
        .from("users")
        .update({
          nickname: name,
          phone: tel,
          updated_at: new Date(),
        })
        .eq("id", authId);

      if (userError) throw userError;

      const { data: member, error: memberError } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", authId)
        .order("joined_at", { ascending: false })
        .limit(1)
        .single();

      if (memberError || !member) {
        addToast("그룹 정보를 찾을 수 없습니다", "", "warning");
        return;
      }

      const currentGroupId = member.group_id;

      const { data: existingAccount, error: checkError } = await supabase
        .from("account_infos")
        .select("id")
        .eq("user_id", authId)
        .eq("group_id", currentGroupId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingAccount) {
        const { error: updateError } = await supabase
          .from("account_infos")
          .update({
            bank_name: bank,
            account_number: account,
            account_holder: depositor,
          })
          .eq("user_id", authId)
          .eq("group_id", currentGroupId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("account_infos")
          .insert({
            user_id: authId,
            group_id: currentGroupId,
            bank_name: bank,
            account_number: account,
            account_holder: depositor,
          });

        if (insertError) throw insertError;
      }

      addToast("저장되었습니다!", "", "success");
    } catch (err) {
      console.error(err);
      addToast("저장 중 오류가 발생했습니다.", "", "error");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      addToast("로그아웃 실패", "", "error");
      return;
    }

    addToast("로그아웃되었습니다", "", "success");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("정말 회원탈퇴하시겠습니까?");
    if (!confirm) return;

    try {
      const { error } = await deleteUser();
      if (error) throw error;

      addToast("회원탈퇴되었습니다", "", "success");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
      addToast("회원탈퇴 중 오류가 발생했습니다.", "", "error");
    }
  };

  const handleChangeProfile = async (file: File) => {
    const imageUploadUrl = await uploadImage("images/profiles", file);
    if (!imageUploadUrl) {
      addToast("프로필 이미지 업로드 중 오류가 발생했습니다.", "", "error");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({
        profile: imageUploadUrl,
      })
      .eq("id", userId);

    if (error) throw error;
    setUserInfo((prev) => (prev ? { ...prev, profile: imageUploadUrl } : null));
    addToast("프로필 이미지가 변경되었습니다.", "", "success");
  };

  return (
    <div className={styles.container}>
      <Header title="마이페이지" />
      <div className={styles.box}>
        <div className={styles.profile}>
          <MyProfilePicture
            profile={userInfo?.profile ?? ""}
            onChangeProfile={handleChangeProfile}
          />
          <h3 className={styles.nick}>{userInfo?.nickname}</h3>
          <p className={styles.email}>{userInfo?.email}</p>
        </div>

        <div className={styles.input}>
          <Input
            name="name"
            label="이름"
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={setName}
          />
          <Input
            name="tel"
            label="연락처"
            type="tel"
            placeholder="연락처"
            value={tel}
            onChange={setTel}
          />
          <Input
            name="bank"
            label="은행"
            type="text"
            placeholder="은행"
            value={bank}
            onChange={setBank}
          />
          <Input
            name="account"
            label="계좌번호"
            type="text"
            placeholder="계좌번호"
            value={account}
            onChange={setAccount}
          />
          <Input
            name="depositor"
            label="예금주"
            type="text"
            placeholder="예금주"
            value={depositor}
            onChange={setDepositor}
          />
        </div>
        <div className={styles.footer}>
          <TipBox />
          <Button type="button" variant="default" onClick={onClick}>
            저장하기
          </Button>
        </div>
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => navigate("/password")}
          >
            비밀번호 변경
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.actionButtonDanger}`}
            onClick={handleDeleteAccount}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      <div className={styles.botNav}>
        <ButtonNavigation />
      </div>
    </div>
  );
}
