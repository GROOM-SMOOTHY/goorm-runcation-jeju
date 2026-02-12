import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "@/components/common/Input/Input.module.css";

interface InputProps {
	label: string;
	name: string;
	value?: string;
	onChange?: (value: string) => void;
	type?: string;
	placeholder?: string;
	variant?: "default" | "auth";
	onAuthRequest?: () => void;
	required?: boolean;
	authTimeout?: number; // 초 단위 (기본값: 120초)
}

const Input: React.FC<InputProps> = ({
	label,
	name,
	value = "",
	onChange,
	type = "text",
	placeholder = "",
	variant = "default",
	onAuthRequest,
	required = false,
	authTimeout = 120,
}) => {
	const [isRequested, setIsRequested] = useState(false);
	const [timeLeft, setTimeLeft] = useState(authTimeout);

	// 타이머 로직
	useEffect(() => {
		if (!isRequested || timeLeft <= 0) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev - 1 <= 0) {
					setIsRequested(false);
					return authTimeout;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isRequested, timeLeft, authTimeout]);

	// 인증 요청 핸들러
	const handleAuthRequest = useCallback(() => {
		setIsRequested(true);
		setTimeLeft(authTimeout);
		onAuthRequest?.();
	}, [authTimeout, onAuthRequest]);

	// 시간 포맷팅 (MM:SS)
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	return (
		<div className={styles.Field}>
			<div className={styles.LabelWrapper}>
				<label htmlFor={name} className={styles.Label}>{label}</label>
			</div>

			{variant === "auth" ? (
				<div className={styles.AuthContainer}>
					<input
						id={name}
						className={styles.Input}
						type={type}
						value={value}
						onChange={(e) => onChange?.(e.target.value)}
						required={required}
						placeholder={placeholder}
					/>

					{/* 인증 요청 텍스트 버튼 */}
					{!isRequested ? (
						<button
							type="button"
							className={styles.AuthRequestText}
							onClick={handleAuthRequest}
						>
							인증요청
						</button>
					) : (
						<div className={styles.AuthTimerContainer}>
							<button
								type="button"
								className={styles.AuthRetryText}
								onClick={handleAuthRequest}
							>
								인증요청 다시보내기
							</button>
							<span className={styles.TimerText}>
								{formatTime(timeLeft)}
							</span>
						</div>
					)}
				</div>
			) : (
				<input
					id={name}
					className={styles.Input}
					type={type}
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					required={required}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};

export default Input;
