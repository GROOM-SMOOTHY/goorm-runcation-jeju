import type { ReactNode } from "react";
import Loading from "@/components/common/Loading/Loading";
import "@/components/common/Button/Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "default",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${variant} ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className="btn-content">
        {loading ? "로딩중" : children}
        {loading && <Loading />}
      </span>
    </button>
  );
}