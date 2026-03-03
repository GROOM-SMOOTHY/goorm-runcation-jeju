import styles from "@/pages/MyPage/MyPage.module.css";
import Header from "@/components/layout/Header/Header";
import MyProfilePicture from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture";
import TipBox from "@/components/pages/Mypage/TipBox/TipBox";
import Button from "@/components/common/Button/Button";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Input from "@/components/common/Input/Input";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/store";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";

export default function MyPage() {
  const { id: userId } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [depositor, setDepositor] = useState("");

  const addToast = useToastStore((state) => state.addToast);

  const isValid =
    name.trim() &&
    tel.trim() &&
    bank.trim() &&
    account.trim() &&
    depositor.trim();

  const [userInfo, setUserInfo] = useState<{
    nickname: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("nickname, email, phone")
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

    fetchUser();
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

      // 1️⃣ 계좌 존재 여부 확인
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
      alert("저장되었습니다!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      addToast("저장 중 오류가 발생했습니다.", "", "error");
    }
  };

  return (
    <div className={styles.container}>
      <Header title="마이페이지" />
      <div className={styles.box}>
        <div className={styles.profile}>
          <MyProfilePicture />
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
      </div>
      <div className={styles.botNav}>
        <ButtonNavigation />
      </div>
    </div>
  );
}
