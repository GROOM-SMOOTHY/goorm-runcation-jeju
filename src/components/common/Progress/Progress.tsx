import styles from "@/components/common/Progress/Progress.module.css";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface Props {
  progress: number;
  onValueChange?: (value: number) => void;
}
const Progress = ({ progress, onValueChange }: Props) => {
  return (
    <div className={styles.container}>
      <ProgressPrimitive.Root className={styles.Root} value={progress}>
        <ProgressPrimitive.Indicator
          className={styles.Indicator}
          style={{ width: `${progress}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
};

export default Progress;
