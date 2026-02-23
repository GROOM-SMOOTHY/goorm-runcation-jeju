import styles from '@/pages/MyPage/MyPage.module.css';
import Header from '@/components/layout/Header/Header';
import MyProfilePicture from '@/components/pages/Mypage/MyProfilePicture/MyProfilePicture';
import TipBox from '@/components/pages/Mypage/TipBox/TipBox';
import Button from '@/components/common/Button/Button';
import ButtonNavigation from '@/components/common/BottomNavigation/BottomNavigation';

import { useState } from 'react';
import Input from '@/components/common/Input/Input';

export default function MyPage() {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [depositor, setDepositor] = useState('');

  const isVaild =
    name.trim() &&
    tel.trim() &&
    bank.trim() &&
    account.trim() &&
    depositor.trim();

  const onClick = () => {
    if (!isVaild) {
      alert('모든 정보를 입력해주세요!');
      return;
    }
    alert('저장되었습니다!');
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
