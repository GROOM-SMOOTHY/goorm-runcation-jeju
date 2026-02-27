import Input from "@/components/common/Input/Input";
import styles from "./styles.module.css";
import type { GroupFormValues } from "./useCreateGroupModal";
import CourseSelectBox from "./CourseSelectBox/CourseSelectBox";

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
      <div className={styles.selectBoxWrapper}>
        <label className={styles.selectLabel} htmlFor="course-select">
          과정
        </label>
        <CourseSelectBox
          value={formValues.course}
          onChange={(value) => onChange({ ...formValues, course: value })}
        />
      </div>
      <Input
        type="number"
        value={formValues.generation?.toString() ?? ""}
        onChange={(value) =>
          onChange({ ...formValues, generation: Number(value) })
        }
        label="기수"
        name="generation"
        placeholder="기수를 입력해주세요."
      />
    </div>
  );
}
