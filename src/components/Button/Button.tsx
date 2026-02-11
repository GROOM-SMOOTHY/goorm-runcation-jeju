import type { ReactNode } from "react";
import "./button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "default",
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
