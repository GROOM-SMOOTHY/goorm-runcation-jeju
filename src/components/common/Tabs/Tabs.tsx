import type { ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./style.module.css";

export const Tabs = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={className ? `${styles.tabs} ${className}` : styles.tabs}
    {...props}
  />
);

export const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={className ? `${styles.list} ${className}` : styles.list}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={className ? `${styles.trigger} ${className}` : styles.trigger}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={className ? `${styles.content} ${className}` : styles.content}
    {...props}
  />
);
