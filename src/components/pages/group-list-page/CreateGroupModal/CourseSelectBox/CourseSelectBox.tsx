import { useRef, useState } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import styles from "./styles.module.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { Database } from "@/types/supabase";
import { getCourseName } from "@/utils/course";

interface CourseSelectBoxProps {
  value: Database["public"]["Enums"]["course_type"] | null;
  onChange: (value: Database["public"]["Enums"]["course_type"]) => void;
}

const modalRoot =
  typeof document !== "undefined"
    ? document.getElementById("modal-root")
    : null;

export default function CourseSelectBox({
  value,
  onChange,
}: CourseSelectBoxProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth);
    }
  };

  return (
    <RadixSelect.Root
      value={value ?? undefined}
      onValueChange={onChange}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <RadixSelect.Trigger
        ref={triggerRef}
        className={styles.trigger}
        aria-label="과정"
      >
        {value ? (
          <RadixSelect.Value>{getCourseName(value)}</RadixSelect.Value>
        ) : (
          "과정을 선택해주세요."
        )}

        <ChevronDownIcon className={styles.icon} />
      </RadixSelect.Trigger>
      <RadixSelect.Portal container={modalRoot ?? undefined}>
        <RadixSelect.Content
          className={styles.content}
          position="popper"
          sideOffset={4}
          style={contentWidth ? { width: contentWidth } : undefined}
        >
          <RadixSelect.Viewport className={styles.viewport}>
            <RadixSelect.Item value="FRONTEND" className={styles.item}>
              프론트엔드
            </RadixSelect.Item>
            <RadixSelect.Item value="BACKEND" className={styles.item}>
              백엔드
            </RadixSelect.Item>
            <RadixSelect.Item value="DESIGN" className={styles.item}>
              디자인
            </RadixSelect.Item>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
