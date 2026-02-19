import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import styles from "./styles.module.css";
import Input from "@/components/common/Input/Input";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

interface GroupFormValues {
    groupName: string;
    course: string;
    generation: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

type Steps = 'group-info-form' | 'success';

export default function CreateGroupModal({ open, onClose }: Props) {
    const [steps, setSteps] = useState<Steps>('group-info-form');

    const [formValues, setFormValues] = useState<GroupFormValues>({
        groupName: '',
        course: '',
        generation: '',
    });

    const handleNext = () => {
        if (steps === 'group-info-form') {
            setSteps('success');
        } else if (steps === 'success') {
            onClose();
        }
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText('123456');
            // TODO: 복사 완료 토스트/피드백 추가
        } catch {
            console.error('클립보드 복사 실패');
        }
    };

    useEffect(() => {
        return () => {
            setSteps('group-info-form');
        }
    }, [open]);

    return (
        <Modal isOpen={open} onClose={onClose}>
            <Modal.Header>
                그룹 생성
            </Modal.Header>
            <Modal.Content>
                {steps === 'group-info-form' &&
                    <div className={styles.content}>
                        <Input value={formValues.groupName} onChange={(value) => setFormValues({ ...formValues, groupName: value })} label="그룹명" name='groupName' placeholder="그룹명을 입력해주세요." />
                        <Input value={formValues.course} onChange={(value) => setFormValues({ ...formValues, course: value })} label="과정" name='course' placeholder="과정을 선택해주세요." />
                        <Input value={formValues.generation} onChange={(value) => setFormValues({ ...formValues, generation: value })} label="기수" name='generation' placeholder="기수를 입력해주세요." />
                    </div>
                }
                {steps === 'success' &&
                    <div className={styles.successWrap}>
                        <div className={styles.iconWrap}>
                            <div className={styles.iconBox}>
                                <FaCheck size={48} color="var(--text-white)" />
                            </div>
                        </div>

                        <div className={styles.titleWrap}>
                            <p className={styles.title}>그룹생성 완료!</p>
                            <p className={styles.description}>초대 코드를 복사해서<br />팀원들과 함께 런케이션을 시작해보세요 </p>
                        </div>

                        <div className={styles.codeContent}>
                            <p className={styles.codeLabel}>초대코드</p>
                            <div className={styles.codeBox}>
                                <span className={styles.codeText}>123456</span>
                                <MdContentCopy size={24} color="var(--brand-primary)" style={{ cursor: 'pointer' }} onClick={handleCopyCode} />
                            </div>
                        </div>
                    </div>
                }
            </Modal.Content>
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={handleNext}>{steps === 'group-info-form' ? '생성하기' : '닫기'}</Button>
            </Modal.Footer>
        </Modal>
    )
}