import "@/components/Textarea/textarea.moudle.css";

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
    <div className="container">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
