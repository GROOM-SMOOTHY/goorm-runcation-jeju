import type { ReactNode } from "react";
import "@/components/common/Button/Button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
  type: "button";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "default",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
