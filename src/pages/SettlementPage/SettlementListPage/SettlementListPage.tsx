import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SettleCard, {
  type SettleCardProps,
  type SettlementStatus,
} from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import styles from "@/pages/SettlementPage/SettlementListPage/SettlementListPage.module.css";

import { supabase } from "@/lib/supabase";
import { useGroup } from "@/store/useGroup";
import { useUser } from "@/store/useUser";
import { format } from "date-fns";

// --- 타입 정의 추가 ---
interface ParticipantData {
  id: string;
  expense_id: string;
  user_id: string;
  state: "PENDING" | "COMPLETE";
  amount: number;
}

interface ExpenseData {
  id: string;
  payer_id: string;
  payment_title: string;
  total_amount: number;
  expense_date: string;
  category: string;
  group_id: string;
  expense_participants: ParticipantData[];
}

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

  const summary = useMemo(() => {
    return settlements.reduce(
      (acc, curr) => {
        const amountPerPerson =
          curr.totalMemberCount > 0
            ? Math.floor(curr.totalAmount / curr.totalMemberCount)
            : 0;

        const isMeInvolved = [
          ...curr.pendingMembers,
          ...curr.completedMembers,
        ].some((m) => m.name === userData?.nickname);

        if (isMeInvolved) {
          if (curr.status === "completed") acc.paid += amountPerPerson;
          else acc.toPay += amountPerPerson;
        }
        return acc;
      },
      { paid: 0, toPay: 0 },
    );
  }, [settlements, userData?.nickname]);

  const handleUpdateStatus = async (
    expenseId: string,
    newStatus: SettlementStatus,
  ) => {
    if (!storedUserId || !userData?.nickname) return;

    const dbState = newStatus === "completed" ? "COMPLETE" : "PENDING";

    setSettlements((prev) => {
      return prev.map((s) => {
        if (s.expenseId === expenseId) {
          let updatedCompleted = [...s.completedMembers];
          let updatedPending = [...s.pendingMembers];

          if (newStatus === "completed") {
            if (!updatedCompleted.some((m) => m.name === userData.nickname)) {
              updatedCompleted.push({ name: userData.nickname });
              updatedPending = updatedPending.filter(
                (m) => m.name !== userData.nickname,
              );
            }
          } else {
            updatedCompleted = updatedCompleted.filter(
              (m) => m.name !== userData.nickname,
            );
            if (!updatedPending.some((m) => m.name === userData.nickname)) {
              updatedPending.push({ name: userData.nickname });
            }
          }

          supabase
            .from("expense_participants")
            .update({ state: dbState })
            .eq("expense_id", expenseId)
            .eq("user_id", storedUserId)
            .then(({ error }) => {
              if (error) {
                console.error("DB 업데이트 에러:", error.message);
              } else {
                localStorage.setItem(
                  `settle_done_${expenseId}`,
                  newStatus === "completed" ? "true" : "false",
                );
              }
            });

          return {
            ...s,
            status: newStatus,
            completedMembers: updatedCompleted,
            pendingMembers: updatedPending,
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
        // any 제거: ExpenseData[]로 타입 지정
        const { data: expensesData, error: expensesError } = await supabase
          .from("expenses")
          .select(`*, expense_participants (*)`)
          .eq("group_id", group.id)
          .order("expense_date", { ascending: false });

        if (expensesError) throw expensesError;
        if (!expensesData) return;

        const typedExpenses = expensesData as ExpenseData[];

        const allUserIds = Array.from(
          new Set([
            ...typedExpenses.map((e) => e.payer_id),
            ...typedExpenses.flatMap(
              (e) => e.expense_participants?.map((p) => p.user_id) || [],
            ),
          ]),
        );

        const [usersRes, accountsRes] = await Promise.all([
          supabase.from("users").select("id, nickname").in("id", allUserIds),
          supabase
            .from("account_infos")
            .select("user_id, bank_name, account_number")
            .in("user_id", allUserIds),
        ]);

        const formattedData: SettleCardProps[] = typedExpenses.map((item) => {
          const payerUser = usersRes.data?.find((u) => u.id === item.payer_id);
          const payerAccount = accountsRes.data?.find(
            (a) => a.user_id === item.payer_id,
          );

          const participants: ParticipantInfo[] =
            item.expense_participants?.map((p) => ({
              name:
                usersRes.data?.find((u) => u.id === p.user_id)?.nickname ||
                "알 수 없음",
              isPaid: p.state === "COMPLETE",
              userId: p.user_id,
            })) || [];

          const myData = participants.find((p) => p.userId === storedUserId);
          const isMeCompleted = myData?.isPaid || false;

          return {
            expenseId: item.id,
            title: item.payment_title,
            date: item.expense_date
              ? format(new Date(item.expense_date), "yy.MM.dd")
              : "-",
            totalMemberCount: participants.length,
            totalAmount: item.total_amount,

            category: item.category,

            completedMembers: participants
              .filter((p) => p.isPaid)
              .map((p) => ({ name: p.name })),

            pendingMembers: participants
              .filter((p) => !p.isPaid)
              .map((p) => ({ name: p.name })),

            accountHolder: {
              name: payerUser?.nickname || "알 수 없음",
              bank: payerAccount?.bank_name || "",
              accountNumberMasked: payerAccount?.account_number
                ? `${payerAccount.account_number.slice(0, 4)}***`
                : "계좌 미등록",
              accountNumberForCopy: payerAccount?.account_number || "",
            },

            status: isMeCompleted ? "completed" : "pending",
            currentUserName: userData?.nickname || "",
          };
        });

        setSettlements(formattedData);
      } catch (err) {
        const error = err as Error;
        console.error("로드 실패:", error.message);
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
                <span className={styles.summaryAmountPaid}>
                  ₩{summary.paid.toLocaleString()}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>내야할 금액</span>
                <span className={styles.summaryAmountToPay}>
                  ₩{summary.toPay.toLocaleString()}
                </span>
              </div>
            </section>

            <div className={styles.cardList}>
              {settlements.map((s) => (
                <SettleCard
                  key={s.expenseId}
                  expenseId={s.expenseId}
                  title={s.title}
                  category={s.category}
                  expenseDate={s.date ?? ""}
                  memberCount={s.totalMemberCount}
                  isProgressFull={s.isProgressFull}
                />
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
