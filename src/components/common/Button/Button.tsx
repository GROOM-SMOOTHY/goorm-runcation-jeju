import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import Loading from "@/components/common/Loading/Loading";
import styles from "@/components/common/Button/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "default";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      loading = false,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`
          ${styles.btn}
          ${styles[variant]}
          ${loading ? styles.loading : ""}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        <span className={styles.content}>
          {loading ? <Loading /> : children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
