import type { ReactNode } from 'react';
import Loading from '@/components/common/Loading/Loading';
import styles from '@/components/common/Button/Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'default';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'default',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        ${styles.btn}
        ${styles[variant]}
        ${loading ? styles.loading : ''}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className={styles.content}>{loading ? <Loading /> : children}</span>
    </button>
  );
}
