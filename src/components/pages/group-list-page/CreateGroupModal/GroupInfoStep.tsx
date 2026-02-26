import Input from "@/components/common/Input/Input";
import styles from "./styles.module.css";
import type { GroupFormValues } from "./useCreateGroupModal";

interface Props {
  formValues: GroupFormValues;
  onChange: (values: GroupFormValues) => void;
}

export default function GroupInfoStep({ formValues, onChange }: Props) {
  return (
    <div className={styles.content}>
      <Input
        value={formValues.groupName}
        onChange={(value) => onChange({ ...formValues, groupName: value })}
        label="그룹명"
        name="groupName"
        placeholder="그룹명을 입력해주세요."
      />
      <Input
        value={formValues.course}
        onChange={(value) => onChange({ ...formValues, course: value })}
        label="과정"
        name="course"
        placeholder="과정을 선택해주세요."
      />
      <Input
        value={formValues.generation}
        onChange={(value) => onChange({ ...formValues, generation: value })}
        label="기수"
        name="generation"
        placeholder="기수를 입력해주세요."
      />
    </div>
  );
}
