import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from "react";
import Header from '@/components/layout/Header/Header';
import BottomNavigation from '@/components/common/BottomNavigation/BottomNavigation';
import SettleCard, {
  type SettleCardProps,
  type SettlementStatus
} from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import styles from "@/pages/SettlementPage/SettlementListPage/SettlementListPage.module.css";

import { supabase } from "@/lib/supabase";
import { useGroup } from "@/store/useGroup";
import { useUser } from "@/store/useUser";

// 참여자 데이터 타입 정의
interface ParticipantInfo {
  name: string;
  isPaid: boolean;
  userId: string;
}

export default function SettlementListPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  const { id: storedUserId, data: userData } = useUser();
  
  const [settlements, setSettlements] = useState<SettleCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // 실시간 상단 요약 정보 계산
  const summary = useMemo(() => {
    return settlements.reduce((acc, curr) => {
      const amountPerPerson = curr.totalMemberCount > 0 
        ? Math.floor(curr.totalAmount / curr.totalMemberCount) : 0;
      
      const isMeInvolved = [...curr.pendingMembers, ...curr.completedMembers].some(
        (m) => m.name === userData?.nickname
      );

      if (isMeInvolved) {
        if (curr.status === 'completed') acc.paid += amountPerPerson;
        else acc.toPay += amountPerPerson;
      }
      return acc;
    }, { paid: 0, toPay: 0 });
  }, [settlements, userData?.nickname]);

  // 상태 업데이트 핸들러
  const handleUpdateStatus = async (expenseId: string, newStatus: SettlementStatus) => {
    if (!storedUserId || !userData?.nickname) return;
  
    const dbState = newStatus === "completed" ? "COMPLETE" : "PENDING";
  
    setSettlements((prev) => {
      return prev.map((s) => {
        if (s.expenseId === expenseId) {
          let updatedCompleted = [...s.completedMembers];
          let updatedPending = [...s.pendingMembers];
  
          if (newStatus === "completed") {
            if (!updatedCompleted.some(m => m.name === userData.nickname)) {
              updatedCompleted.push({ name: userData.nickname });
              updatedPending = updatedPending.filter(m => m.name !== userData.nickname);
            }
          } else {
            updatedCompleted = updatedCompleted.filter(m => m.name !== userData.nickname);
            if (!updatedPending.some(m => m.name === userData.nickname)) {
              updatedPending.push({ name: userData.nickname });
            }
          }
  
          supabase
          .from("expense_participants")
          .update({ state: dbState }) 
          .eq("expense_id", expenseId)
          .eq("user_id", storedUserId)
          .select()
          .then(({ data, error }) => {
            if (error) {
              console.error("DB 업데이트 에러 상세:", error.message);
              console.error("에러 코드:", error.code);
            } else {
              console.log("DB 업데이트 성공 데이터:", data);
              localStorage.setItem(`settle_done_${expenseId}`, newStatus === "completed" ? "true" : "false");
            }
          });

          return { 
            ...s, 
            status: newStatus,
            completedMembers: updatedCompleted,
            pendingMembers: updatedPending
          };
        }
        return s;
      });
    });
  };

  useEffect(() => {
    const fetchSettlements = async () => {
      if (!group?.id) return;
      setLoading(true);
      
      try {
        const { data: expensesData, error: expensesError } = await supabase
          .from('expenses')
          .select(`*, expense_participants (*)`)
          .eq('group_id', group.id)
          .order('expense_date', { ascending: false });
  
        if (expensesError) throw expensesError;
  
        const allUserIds = Array.from(new Set([
          ...(expensesData?.map(e => e.payer_id) || []),
          ...(expensesData?.flatMap(e => e.expense_participants?.map((p: any) => p.user_id)) || [])
        ]));
  
        const [usersRes, accountsRes] = await Promise.all([
          supabase.from('users').select('id, nickname').in('id', allUserIds),
          supabase.from('account_infos').select('user_id, bank_name, account_number').in('user_id', allUserIds)
        ]);
  
        const formattedData: SettleCardProps[] = expensesData.map((item: any) => {
          const payerUser = usersRes.data?.find(u => u.id === item.payer_id);
          const payerAccount = accountsRes.data?.find(a => a.user_id === item.payer_id);
          
          // 참여자 데이터 가공 및 타입 지정
          const participants: ParticipantInfo[] = item.expense_participants?.map((p: any) => ({
            name: usersRes.data?.find(u => u.id === p.user_id)?.nickname || "알 수 없음",
            isPaid: p.state === 'COMPLETE',
            userId: p.user_id
          })) || [];

          const myData = participants.find((p: ParticipantInfo) => p.userId === storedUserId);
          const isMeCompleted = myData?.isPaid || false;
  
          return {
            expenseId: item.id,
            title: item.payment_title,
            date: item.expense_date ? new Date(item.expense_date).toLocaleDateString() : "-",
            totalMemberCount: participants.length,
            totalAmount: item.total_amount,
            // 🔍 filter와 map에 명시적 타입 부여로 에러 해결
            completedMembers: participants
              .filter((p: ParticipantInfo) => p.isPaid)
              .map((p: ParticipantInfo) => ({ name: p.name })),
            pendingMembers: participants
              .filter((p: ParticipantInfo) => !p.isPaid)
              .map((p: ParticipantInfo) => ({ name: p.name })),
            accountHolder: {
              name: payerUser?.nickname || "알 수 없음",
              bank: payerAccount?.bank_name || "미등록",
              accountNumberMasked: payerAccount?.account_number ? `${payerAccount.account_number.slice(0, 4)}***` : "계좌 없음",
              accountNumberForCopy: payerAccount?.account_number || "",
            },
            status: isMeCompleted ? 'completed' : 'pending',
            currentUserName: userData?.nickname || "",
          };
        });
  
        setSettlements(formattedData);
      } catch (err: any) {
        console.error("로드 실패:", err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSettlements();
  }, [group?.id, storedUserId, userData?.nickname]);

  return (
    <div className={styles.page}>
      <Header title="정산 내역" onBack={() => navigate(-1)} />
      
      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>불러오는 중...</div>
        ) : (
          <>
            <section className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>지금까지 낸 금액</span>
                <span className={styles.summaryAmountPaid}>₩{summary.paid.toLocaleString()}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>내야할 금액</span>
                <span className={styles.summaryAmountToPay}>₩{summary.toPay.toLocaleString()}</span>
              </div>
            </section>

            <div className={styles.cardList}>
              {settlements.map((s) => (
                <SettleCard key={s.expenseId} {...s} onStatusChange={handleUpdateStatus} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
      <AnimatedToast />
    </div>
  );
}