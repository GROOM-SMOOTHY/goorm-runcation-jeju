import styles from "@/components/common/Progress/Progress.module.css";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface Props {
  progress: number;
}

const Progress = ({ progress }: Props) => {
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
