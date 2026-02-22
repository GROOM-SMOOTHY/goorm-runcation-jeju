import styles from "@/pages/MyPage/MyPage.module.css";
import Header from "@/components/layout/Header/Header";
import MyProfilePicture from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture";
import TipBox from "@/components/pages/Mypage/TipBox/TipBox";
import Button from "@/components/common/Button/Button";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import MyPageInput from "./MyPageInput";

import { useState } from "react";

export default function MyPage() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [depositor, setDepositor] = useState("");

  const isVaild =
    name.trim() &&
    tel.trim() &&
    bank.trim() &&
    account.trim() &&
    depositor.trim();

  const onClick = () => {
    if (!isVaild) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    alert("저장되었습니다!");
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
          <MyPageInput type="name" value={name} onChange={setName} />
          <MyPageInput type="tel" value={tel} onChange={setTel} />
          <MyPageInput type="bank" value={bank} onChange={setBank} />
          <MyPageInput type="account" value={account} onChange={setAccount} />
          <MyPageInput
            type="depositor"
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
