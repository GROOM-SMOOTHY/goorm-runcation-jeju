import type { ReactNode } from "react";
import "@/button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
  type: "button";
}

export default function Button({
  children,
  variant = "default",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
