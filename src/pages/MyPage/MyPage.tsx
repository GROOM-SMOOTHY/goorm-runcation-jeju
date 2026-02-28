import styles from "@/pages/MyPage/MyPage.module.css";
import Header from "@/components/layout/Header/Header";
import MyProfilePicture from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture";
import TipBox from "@/components/pages/Mypage/TipBox/TipBox";
import Button from "@/components/common/Button/Button";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Input from "@/components/common/Input/Input";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/store";

export default function MyPage() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [depositor, setDepositor] = useState("");
  const { id: userId } = useUser();

  const isValid =
    name.trim() &&
    tel.trim() &&
    bank.trim() &&
    account.trim() &&
    depositor.trim();

  const onClick = async () => {
    if (!isValid) {
      alert("모든 정보를 입력해주세요");
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
        .eq("id", userId);

      if (userError) throw userError;

      const { data: member, error: memberError } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", userId)
        .order("joined_at", { ascending: false })
        .limit(1)
        .single();

      if (memberError || !member) {
        alert("그룹 정보를 찾을 수 없습니다");
        return;
      }

      const currentGroupId = member.group_id;

      const { error: accountError } = await supabase
        .from("account_infos")
        .upsert({
          user_id: userId,
          group_id: currentGroupId,
          bank_name: bank,
          account_number: account,
          account_holder: depositor,
        });

      if (accountError) throw accountError;

      alert("저장되었습니다!");
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className={styles.container}>
      <Header title="마이페이지" />
      <div className={styles.box}>
        <div className={styles.profile}>
          <MyProfilePicture />
          <h3 className={styles.nick}>닉네임</h3>
          <p className={styles.email}>이메일</p>
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
          <Button type="button" variant="primary" onClick={onClick}>
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
