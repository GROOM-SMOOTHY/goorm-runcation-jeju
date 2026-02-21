import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./Calendar.module.css";
import { ko } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={[styles.root, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Calendar };
