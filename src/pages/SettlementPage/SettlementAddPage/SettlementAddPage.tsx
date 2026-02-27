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
import { useToastStore } from "@/components/common/Toast/ToastStore";

export default function SettlementAddPage() {
    const navigate = useNavigate();
    const { group } = useGroup();

    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [members, setMembers] = useState<Member[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [user, setUser] = useState<string>("");
    const [accountInfo, setAccountInfo] = useState<string>("등록된 계좌 없음");
    const { addToast } = useToastStore();

    useEffect(() => {
        if (!user) return;

        const fetchUserAccount = async () => {
            // account_infos 테이블에서 결제자의 은행명과 계좌번호를 가져옴
            const { data, error } = await supabase
                .from("account_infos")
                .select("bank_name, account_number")
                .eq("user_id", user) // 유저 ID로 검색
                .single();

            if (error) {
                console.error("계좌 정보 불러오기 실패:", error.message);
                setAccountInfo("등록된 계좌 정보가 없습니다.");
                return;
            }

            if (data) {
                // "신한은행: 1234-1234-1234" 형식으로 포맷팅
                setAccountInfo(`${data.bank_name} : ${data.account_number}`);
            } else {
                setAccountInfo("등록된 계좌 없음");
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
        try {
            const {data : expenses, error : expensesError} = await supabase
                .from('expenses') // expenses(정산) 테이블에 저장
                .insert(
                    [{
                        total_amount : amount, // 총지출
                        payment_title : title, // 정산명
                        expense_date : date?.toISOString(), // 지출일자
                        category : category, // 카테고리
                        payer_id : user, // 결제자
                        group_id: group.id, // 그룹 아이디
                    }]
                )
                .select()
                .single()

            if (expensesError) throw expensesError

            // 유저 데이터를 배열에서 구조분해한거 participantsData에에 저장함
            const participantsData = members.map((member) => ({
                expense_id: expenses.id,
                user_id: member.userId,
                amount: amountPerPerson,
            }))

            const {error : expense_participants} = await supabase
                .from('expense_participants') // expenses(정산) 테이블에 저장
                .insert(participantsData) // 구조분해한 데이터 넣기

            if (expense_participants) throw expense_participants
            
            addToast("정산 완료", `${title} 내역이 저장되었습니다.`, "success");

            setAmount(0)
            navigate("/settlement");
        } catch (err: any) {
            console.error('데이터 저장 실패:', err.message);
            addToast("저장 실패", "데이터 저장 중 에러가 발생했습니다.", "error");
        }


        console.log(amount, title, category, members, date, user);
    }
    
    // N빵 로직
    const amountPerPerson = members.length > 0 
        ? Math.floor(amount / members.length) 
        : 0;
        
    return (
        <>
            <Header title='정산하기' onBack={() => navigate(-1)} />
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <span className={styles.inputLabel}>정산금액</span>
                    <PaymentInput value={amount} onChange={(value) => setAmount(value)} />
                </div>
                <div className={styles.inputField}>
                    <span className={styles.inputLabel}>정산명</span>
                    <Input name="title" placeholder="ex) 제주도 흑돼지 저녁식사" value={title} onChange={(value) => setTitle(value)} />
                </div>
                <div className={styles.inputField}>
                    <span className={styles.inputLabel}>지출일자</span>
                    <DatePicker value={date} onChange={setDate} />
                </div>
                <PayCategory value={category} onChange={setCategory} />
                <PayUser value={user} onChange={setUser} />
                <PaymentsMembers selectedMembers={members} onChangeMembers={setMembers} />

                <div className={styles.payInfo}>
                    <div className={styles.titleWrap}>
                        <span className={styles.title}>인당 지출 금액</span>
                        <span className={styles.subtitle}>{accountInfo}</span>
                    </div>
                    <span className={styles.amountWrap}>₩{amountPerPerson.toLocaleString()}</span>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button variant="primary" type="button" onClick={handleAddSettlement}>정산 내역 추가하기</Button>
            </div>
        </>
    );
}