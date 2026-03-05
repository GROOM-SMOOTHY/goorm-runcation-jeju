import { useState } from "react";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  return {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    isAgreed,
    setIsAgreed,
    isLoading,
    setIsLoading,
  };
}
