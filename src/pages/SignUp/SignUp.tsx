import styles from '@/pages/SignUp/SignUp.module.css';
import SignUpInput from '@/components/pages/SignUp/SignUpInput/SignUpInput';
import SignUpEmailVerification from '@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification';
import Button from '@/components/common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const validationCheck = (): string | null => {
    if (!isVerified) {
      return '인증이 필요해요';
    }
    if (!isAgreed) {
      return '서비스 이용약관에 동의하지 않았어요 .';
    }
    if (!email || !name) {
      return '이메일/이름을 입력해주세요.';
    }
    if (!validatePassword(password)) {
      return '비밀번호는 8자 이상, 영문과 숫자를 포함해야 해요.';
    }

    return null;
  };

  const onClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const validationError = validationCheck();
      if (validationError) {
        alert(validationError);
        return;
      }

      const signUpData = await signUp();
      if (!signUpData?.user?.id) {
        throw new Error('회원 정보를 가져올 수 없습니다.');
      }
      await insertUser(signUpData);

      alert('회원가입 완료');
      navigate('/main', { replace: true });
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const insertUser = async (signUpData: { user?: { id: string } | null }) => {
    const { data, error } = await supabase.from('users').insert({
      id: crypto.randomUUID(), // 서비스용 user id
      account_id: signUpData.user?.id, // auth.users.id
      nickname: name,
      email: email,
      phone: phone,
      profile: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (error) {
      throw new Error('회원 정보 저장에 실패했습니다. ' + error.message);
    }

    return data;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.up}>
          <img src="/src/assets/LoginLogo.png" className={styles.logo} />
          <p className={styles.logoName}>SMOOTHY</p>
        </div>
        <div className={styles.down}>
          <p className={styles.title}>제주에서의 새로운 시작</p>
          <p className={styles.desc}>SMOOTHY와 함께하는 스마트한 런케이션</p>
        </div>
      </div>

      <div className={styles.main}>
        <SignUpInput type="name" value={name} onChange={setName} />
        <SignUpInput type="phone" value={phone} onChange={setPhone} />

        <SignUpEmailVerification
          email={email}
          input={code}
          onChangeEmail={setEmail}
          onChangeCode={setCode}
          onVerified={() => setIsVerified(true)}
        />

        <SignUpInput type="password" value={password} onChange={setPassword} />

        <label className={styles.checkBox}>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>서비스 이용약관 및 개인정보 처리방침에 동의합니다.</span>
        </label>
      </div>

      <div className={styles.footer}>
        <Button
          variant="primary"
          type="button"
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? '처리중' : '시작하기'}
        </Button>

        <p className={styles.front}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className={styles.login}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
