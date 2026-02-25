import styles from './textarea.module.css';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Textarea({
  value,
  onChange,
  placeholder,
}: TextareaProps) {
  return (
    <div className={styles.container}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
