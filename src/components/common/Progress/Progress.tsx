import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import styles from "@/components/common/Progress/Progress.module.css";

const ProgressDemo = () => {
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
    <div className={styles.container}>
      <h1>안녕하세요</h1>
      <ProgressPrimitive.Root className={styles.Root} value={progress} max={100}>
        <ProgressPrimitive.Indicator
          className={styles.Indicator}
          style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }}
        />
      </ProgressPrimitive.Root>
    </div>
	);
};

export default ProgressDemo;
