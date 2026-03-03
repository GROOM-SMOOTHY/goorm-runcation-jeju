import Header from "@/components/layout/Header/Header";
import PaymentInput from "@/components/pages/settlement-add-history-page/PaymentInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import PayCategory from "@/components/pages/settlement-add-history-page/PayCategory";
import PaymentsMembers from "@/components/pages/settlement-add-history-page/PaymentsMembers";
import type { Member } from "@/components/pages/settlement-add-history-page/PaymentsMembers/PaymentsMembers";
import { DatePicker } from "@/components/common/DatePicker";

import PayUser from "@/components/pages/settlement-add-history-page/PayUser";
import { supabase } from "@/lib/supabase";
import { useGroup } from "@/store/useGroup";
import { useUser } from "@/store/useUser";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function SettlementAddPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  const { id: storedUserId } = useUser();
  const { addToast } = useToastStore();

  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [user, setUser] = useState<string>("");
  const [accountInfo, setAccountInfo] = useState<string>("");

  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [holder, setHolder] = useState("");
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  useEffect(() => {
    if (storedUserId) setUser(storedUserId);
  }, [storedUserId]);

  const amountPerPerson = members.length > 0 ? Math.floor(amount / members.length) : 0;

  useEffect(() => {
    if (!user) return;

    const fetchUserAccount = async () => {
      const { data } = await supabase
        .from("account_infos")
        .select("bank_name, account_number, account_holder")
        .eq("user_id", user)
        .maybeSingle();

      if (data) {
        setAccountInfo(`${data.bank_name} : ${data.account_number}`);
        setHasAccount(true);
      } else {
        setAccountInfo("등록된 계좌 정보가 없습니다.");
        setHasAccount(false);
      }
    };

    fetchUserAccount();
  }, [user]);

  const handleAddSettlement = async () => {
    if (!group?.id) {
      addToast("오류", "그룹 정보가 없습니다.", "error");
      return;
    }
    if (amount <= 0 || !title) {
      addToast("입력 확인", "정산 금액과 이름을 입력해주세요.", "warning");
      return;
    }
    if (!user) {
      addToast("입력 확인", "결제자를 선택해주세요.", "warning");
      return;
    }

    const isPayerMe = user === storedUserId;

    // 1. 내가 결제자인데 계좌가 없는 경우 필수 입력 체크
    if (isPayerMe && !hasAccount && (!bank.trim() || !account.trim() || !holder.trim())) {
      addToast("계좌 필요", "나의 계좌 정보를 입력해주세요.", "warning");
      return;
    }

    try {
      // 2. 계좌 정보 저장 (결제자가 '나'일 때만 실행하여 403 방지)
      if (isPayerMe && !hasAccount) {
        const { error: accError } = await supabase
          .from("account_infos")
          .upsert({
            // user 대신 확실한 storedUserId를 사용하여 정책 위반 방지
            user_id: storedUserId, 
            group_id: group.id,
            bank_name: bank,
            account_number: account,
            account_holder: holder,
          });

        if (accError) {
          console.error("Account Upsert Error:", accError);
          throw accError;
        }
      }

      // 3. 지출 내역 저장
      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .insert([
          {
            total_amount: amount,
            payment_title: title,
            expense_date: date?.toISOString(),
            category: category,
            payer_id: user,
            group_id: group.id,
          },
        ])
        .select()
        .single();

      if (expensesError) throw expensesError;

      // 4. 참여자 데이터 저장
      const base = Math.floor(amount / members.length);
      const remainder = amount % members.length;
      const participantsData = members.map((member, idx) => ({
        expense_id: expenses.id,
        user_id: member.userId,
        amount: base + (idx < remainder ? 1 : 0),
      }));

      const { error: pError } = await supabase
        .from("expense_participants")
        .insert(participantsData);

      if (pError) {
        await supabase.from("expenses").delete().eq("id", expenses.id);
        throw pError;
      }

      addToast("정산 완료", `${title} 내역이 저장되었습니다.`, "success");
      navigate(-1);
    } catch (err) {
      console.error("Full Error:", err);
      addToast("저장 실패", "데이터 저장 중 권한 오류가 발생했습니다.", "error");
    }
  };

  return (
    <>
      <Header title="정산하기" onBack={() => navigate(-1)} />
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.inputLabel}>정산금액</span>
          <PaymentInput value={amount} onChange={setAmount} />
        </div>

        <div className={styles.inputField}>
          <span className={styles.inputLabel}>정산명</span>
          <Input
            name="title"
            placeholder="ex) 제주도 흑돼지 저녁식사"
            value={title}
            onChange={setTitle}
          />
        </div>

        <div className={styles.inputField}>
          <span className={styles.inputLabel}>지출일자</span>
          <DatePicker value={date} onChange={setDate} />
        </div>

        <PayCategory value={category} onChange={setCategory} />
        
        <PayUser value={user} onChange={setUser} />

        {!hasAccount && user === storedUserId && (
          <div className={styles.accountInputSection}>
            <div className={styles.warningHeader}>
              <IoAlertCircleOutline size={20} />
              <span className={styles.warningText}>
                나의 계좌 정보가 없어요. 등록해 주세요!
              </span>
            </div>
            
            <div className={styles.accountRow}>
              <Input
                name="bank"
                label="은행명"
                placeholder="ex) 카카오뱅크"
                value={bank}
                onChange={setBank}
              />
              <Input
                name="holder"
                label="예금주"
                placeholder="이름"
                value={holder}
                onChange={setHolder}
              />
            </div>
            <Input
              name="account"
              label="계좌번호"
              placeholder="- 없이 숫자만 입력"
              value={account}
              onChange={setAccount}
            />
          </div>
        )}

        <PaymentsMembers
          selectedMembers={members}
          onChangeMembers={setMembers}
        />

        <div className={styles.payInfo}>
          <div className={styles.titleWrap}>
            <span className={styles.title}>인당 지출 금액</span>
            <span className={styles.subtitle}>
              {user === storedUserId && !hasAccount 
                ? "내 계좌를 등록하면 친구들이 송금하기 편해요!" 
                : accountInfo}
            </span>
          </div>
          <span className={styles.amountWrap}>
            ₩{amountPerPerson.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button variant="primary" type="button" onClick={handleAddSettlement}>
          정산 내역 추가하기
        </Button>
      </div>
    </>
  );
}