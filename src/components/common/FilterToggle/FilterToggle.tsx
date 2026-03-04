import type { ComponentProps } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import styles from "./FilterToggle.module.css";

export const FilterToggleRoot = ({
  className,
  type = "single",
  ...props
}: ComponentProps<typeof ToggleGroup.Root>) => (
  <ToggleGroup.Root
    type={type}
    className={className ? `${styles.list} ${className}` : styles.list}
    {...(props as Record<string, unknown>)}
  />
);

export const FilterToggleItem = ({
  className,
  ...props
}: ComponentProps<typeof ToggleGroup.Item>) => (
  <ToggleGroup.Item
    className={className ? `${styles.trigger} ${className}` : styles.trigger}
    {...props}
  />
);
