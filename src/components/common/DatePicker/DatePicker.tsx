import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FaChevronDown } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover/Popover";
import { Calendar } from "@/components/common/Calendar/Calendar";
import styles from "./DatePicker.module.css";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  dateFormat?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "날짜 선택",
  disabled = false,
  fromDate,
  toDate,
  dateFormat = "yyyy년 M월 d일",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange]
  );

  const formattedDate = value
    ? format(value, dateFormat, { locale: ko })
    : null;

  const disabledMatchers = React.useMemo(() => {
    const matchers: Array<{ before: Date } | { after: Date }> = [];
    if (fromDate) matchers.push({ before: fromDate });
    if (toDate) matchers.push({ after: toDate });
    return matchers.length > 0 ? matchers : undefined;
  }, [fromDate, toDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={[styles.trigger, className].filter(Boolean).join(" ")}
          data-empty={!value}
          aria-label={value ? format(value, "PPP", { locale: ko }) : placeholder}
        >
          <span className={styles.triggerText}>
            {formattedDate ?? placeholder}
          </span>
          <FaChevronDown className={styles.chevron} size={14} aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent className={styles.content} align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          defaultMonth={value}
          disabled={disabledMatchers}
        />
      </PopoverContent>
    </Popover>
  );
}
