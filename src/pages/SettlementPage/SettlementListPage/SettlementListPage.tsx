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

export default function SettlementListPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  const { id: storedUserId, data: userData } = useUser();
  
  const [settlements, setSettlements] = useState<SettleCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. 지금까지 낸 금액 & 내야할 금액 실시간 계산
  const summary = useMemo(() => {
    return settlements.reduce((acc, curr) => {
      // 1인당 금액 계산
      const amountPerPerson = curr.totalMemberCount > 0 
        ? Math.floor(curr.totalAmount / curr.totalMemberCount) 
        : 0;
      
      // 내가 참여자인지 확인 (pending + completed 멤버 중 내 닉네임이 있는지)
      const isMeInvolved = [...curr.pendingMembers, ...curr.completedMembers].some(
        (m) => m.name === userData?.nickname
      );

      if (isMeInvolved) {
        if (curr.status === 'completed') {
          acc.paid += amountPerPerson;
        } else {
          acc.toPay += amountPerPerson;
        }
      }
      return acc;
    }, { paid: 0, toPay: 0 });
  }, [settlements, userData?.nickname]);

  // 2. DB 업데이트 핸들러 (본인의 입금 상태만 변경)
  const handleUpdateStatus = async (expenseId: string, newStatus: SettlementStatus) => {
    if (newStatus !== "completed" || !storedUserId) return;

    const { error } = await supabase
      .from("expense_participants")
      .update({ is_paid: true })
      .eq("expense_id", expenseId)
      .eq("user_id", storedUserId);

    if (error) throw error;

    // 업데이트 성공 시 로컬 상태 반영 (즉시 게이지 상승)
    setSettlements((prev) =>
      prev.map((s) =>
        s.expenseId === expenseId ? { ...s, status: "completed" as const } : s
      )
    );
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
  
        const { data: usersData } = await supabase
          .from('users')
          .select('id, nickname')
          .in('id', allUserIds);
  
        const { data: accountsData } = await supabase
          .from('account_infos')
          .select('user_id, bank_name, account_number')
          .in('user_id', allUserIds);
  
        const formattedData: SettleCardProps[] = expensesData.map((item: any) => {
          const payerUser = usersData?.find(u => u.id === item.payer_id);
          const payerAccount = accountsData?.find(a => a.user_id === item.payer_id);
          const myParticipantInfo = item.expense_participants?.find((p: any) => p.user_id === storedUserId);
          
          const participantsWithNames = item.expense_participants?.map((p: any) => ({
            name: usersData?.find(u => u.id === p.user_id)?.nickname || "알 수 없음",
            is_paid: p.is_paid
          })) || [];
  
          return {
            expenseId: item.id,
            title: item.payment_title,
            date: item.expense_date ? new Date(item.expense_date).toLocaleDateString() : "-",
            totalMemberCount: item.expense_participants?.length || 0,
            totalAmount: item.total_amount,
            completedMembers: participantsWithNames
              .filter((p: any) => p.is_paid)
              .map((p: any) => ({ name: p.name })),
            pendingMembers: participantsWithNames
              .filter((p: any) => !p.is_paid)
              .map((p: any) => ({ name: p.name })),
            accountHolder: {
              name: payerUser?.nickname || "알 수 없음",
              bank: payerAccount?.bank_name || "미등록",
              accountNumberMasked: payerAccount?.account_number 
                ? `${payerAccount.account_number.slice(0, 4)}***` 
                : "계좌 없음",
              accountNumberForCopy: payerAccount?.account_number || "",
            },
            status: myParticipantInfo?.is_paid ? 'completed' : 'pending',
            currentUserName: userData?.nickname || "",
            defaultExpanded: false,
          };
        });
  
        setSettlements(formattedData);
      } catch (err: any) {
        console.error("데이터 로드 실패:", err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSettlements();
  }, [group?.id, storedUserId, userData?.nickname]);

  return (
    <>
      <div className={styles.page}>
        <Header title="정산 내역" onBack={() => navigate(-1)} />
        <main className={styles.main}>
          {loading ? (
            <div className={styles.loading}>정산 내역을 불러오고 있어요...</div>
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
              
              <h2 className={styles.sectionTitle}>정산 목록</h2>
              <div className={styles.cardList}>
                {settlements.map((settlement) => (
                  <SettleCard
                    key={settlement.expenseId}
                    {...settlement}
                    onStatusChange={handleUpdateStatus}
                  />
                ))}
              </div>
            </>
          )}
        </main>
        <div className={styles.bottomNavWrap}>
          <BottomNavigation />
        </div>
      </div>
      <AnimatedToast />
    </>
  );
}