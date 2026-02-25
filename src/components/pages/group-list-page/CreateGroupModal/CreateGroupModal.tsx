import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import styles from './styles.module.css';
import Input from '@/components/common/Input/Input';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { supabase } from '@/lib/supabase';
import generateUniqueGroupCode from '@/utils/generateUniqueGroupCode';

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

const initialFormValues: GroupFormValues = {
  groupName: '',
  course: '',
  generation: '',
};

export default function CreateGroupModal({ open, onClose }: Props) {
  const [steps, setSteps] = useState<Steps>('group-info-form');
  const [formValues, setFormValues] =
    useState<GroupFormValues>(initialFormValues);
  const [createdGroupCode, setCreatedGroupCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: userStore에서 userData가져오기

  const handleNext = () => {
    if (steps === 'group-info-form') {
      handleCreateGroup();
    } else if (steps === 'success') {
      onClose();
    }
  };

  const handleCreateGroup = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    setIsSubmitting(true);
    const code = generateUniqueGroupCode();

    try {
      const { data, error } = await supabase
        .from('groups')
        .insert({
          name: formValues.groupName,
          course: formValues.course,
          batch: formValues.generation,
          code,
          // creator_id: user.id,
        })
        .select('id')
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      if (!data?.id) {
        alert('그룹 생성에 실패했습니다.');
        return;
      }

      await insertGroupMember(data.id);
      setCreatedGroupCode(code);
      setSteps('success');
    } catch (error) {
      console.error(error);
      alert('그룹 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!formValues.groupName) {
      return '그룹명을 입력해주세요.';
    }
    if (!formValues.course) {
      return '과정을 선택해주세요.';
    }
    if (!formValues.generation) {
      return '기수를 입력해주세요.';
    }

    return null;
  };

  const insertGroupMember = async (groupId: string) => {
    const { error } = await supabase.from('group_members').insert({
      group_id: groupId,
      // user_id: userId,
      role: 'OWNER',
    });

    if (error) {
      throw new Error('그룹 멤버 등록 실패', { cause: error });
    }
  };

  const handleCopyCode = async () => {
    if (!createdGroupCode) return;
    try {
      await navigator.clipboard.writeText(createdGroupCode);
      // TODO: 복사 완료 토스트/피드백 추가
    } catch {
      console.error('클립보드 복사 실패');
    }
  };

  useEffect(() => {
    if (!open) {
      setSteps('group-info-form');
      setFormValues(initialFormValues);
      setCreatedGroupCode(null);
    }
  }, [open]);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Modal.Header>그룹 생성</Modal.Header>
      <Modal.Content>
        {steps === 'group-info-form' && (
          <div className={styles.content}>
            <Input
              value={formValues.groupName}
              onChange={(value) =>
                setFormValues({ ...formValues, groupName: value })
              }
              label="그룹명"
              name="groupName"
              placeholder="그룹명을 입력해주세요."
            />
            <Input
              value={formValues.course}
              onChange={(value) =>
                setFormValues({ ...formValues, course: value })
              }
              label="과정"
              name="course"
              placeholder="과정을 선택해주세요."
            />
            <Input
              value={formValues.generation}
              onChange={(value) =>
                setFormValues({ ...formValues, generation: value })
              }
              label="기수"
              name="generation"
              placeholder="기수를 입력해주세요."
            />
          </div>
        )}
        {steps === 'success' && (
          <div className={styles.successWrap}>
            <div className={styles.iconWrap}>
              <div className={styles.iconBox}>
                <FaCheck size={48} color="var(--text-white)" />
              </div>
            </div>

            <div className={styles.titleWrap}>
              <p className={styles.title}>그룹생성 완료!</p>
              <p className={styles.description}>
                초대 코드를 복사해서
                <br />
                팀원들과 함께 런케이션을 시작해보세요{' '}
              </p>
            </div>

            <div className={styles.codeContent}>
              <p className={styles.codeLabel}>초대코드</p>
              <div className={styles.codeBox}>
                <span className={styles.codeText}>
                  {createdGroupCode ?? '—'}
                </span>
                <MdContentCopy
                  size={24}
                  color="var(--brand-primary)"
                  style={{ cursor: 'pointer' }}
                  onClick={handleCopyCode}
                />
              </div>
            </div>
          </div>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={steps === 'group-info-form' && isSubmitting}
        >
          {steps === 'group-info-form'
            ? isSubmitting
              ? '생성 중...'
              : '생성하기'
            : '닫기'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
