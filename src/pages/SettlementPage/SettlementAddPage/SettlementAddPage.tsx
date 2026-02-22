import Header from "@/components/layout/Header/Header";
import PaymentInput from "@/components/pages/settlement-add-history-page/PaymentInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import PayCategory from "@/components/pages/settlement-add-history-page/PayCategory";
import PaymentsMembers from "@/components/pages/settlement-add-history-page/PaymentsMembers";
import type { Member } from "@/components/pages/settlement-add-history-page/PaymentsMembers/data";
import { DatePicker } from "@/components/common/DatePicker";
import PayUser from "@/components/pages/settlement-add-history-page/PayUser";

export default function SettlementAddPage() {
    const navigate = useNavigate();

    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [members, setMembers] = useState<Member[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [user, setUser] = useState<string>("");

    const handleAddSettlement = () => {
        console.log(amount, title, category, members, date, user);
    }

    return (
        <>
            <Header title='정산하기' onBack={() => navigate(-1)} />
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <span className={styles.inputLabel}>지출금액</span>
                    <PaymentInput value={amount} onChange={(value) => setAmount(value)} />
                </div>
                <div className={styles.inputField}>
                    <span className={styles.inputLabel}>지출내용</span>
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
                        <span className={styles.subtitle}>신한은행: 1234-1234-1234</span>
                    </div>
                    <span className={styles.amountWrap}>₩12,833</span>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button variant="primary" type="button" onClick={handleAddSettlement}>정산 내역 추가하기</Button>
            </div>
        </>
    );
}