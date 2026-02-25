import { supabase } from '@/lib/supabase';
import { useUser, type UserState } from '@/store/useUser';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const VALIDATION = {
  INVALID_EMAIL: '올바른 이메일 형식을 입력해주세요',
  EMPTY_FIELDS: '이메일과 비밀번호 모두 입력해주세요',
  LOGIN_FAILED: '로그인 실패',
  USER_FETCH_FAILED: '사용자 정보 조회 실패',
  USER_NOT_FOUND:
    '사용자 정보를 찾을 수 없습니다. Supabase 대시보드에서 users 테이블 RLS 정책을 확인해주세요.',
} as const;

function validateLoginForm(email: string, password: string): string | null {
  if (!EMAIL_REGEX.test(email)) return VALIDATION.INVALID_EMAIL;
  if (!email.trim() || !password.trim()) return VALIDATION.EMPTY_FIELDS;
  return null;
}

interface UsersRow {
  id: string;
  email: string | null;
  nickname: string | null;
  phone: string | null;
  profile: string | null;
  created_at: string;
  updated_at: string;
}

function userRowToState(row: UsersRow, fallbackEmail: string): UserState {
  return {
    id: row.id,
    data: {
      email: row.email ?? fallbackEmail,
      nickname: row.nickname ?? '',
      phone: row.phone ?? '',
      profile: row.profile ?? null,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    },
  } as UserState;
}

export default function useLogin() {
  const navigate = useNavigate();
  const setUser = useUser((s) => s.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: supabase 코드 분리 필요
  const handleLogin = useCallback(async () => {
    const error = validateLoginForm(email, password);
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

      if (signInError) {
        alert(`${VALIDATION.LOGIN_FAILED}: ${signInError.message}`);
        return;
      }

      const authUserId = data.user?.id;
      if (!authUserId) {
        alert(VALIDATION.USER_NOT_FOUND);
        return;
      }

      const { data: userRow, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUserId)
        .maybeSingle();

      if (fetchError) {
        console.error('users 조회 에러:', fetchError);
        alert(`${VALIDATION.USER_FETCH_FAILED}: ${fetchError.message}`);
        return;
      }

      if (!userRow) {
        alert(VALIDATION.USER_NOT_FOUND);
        return;
      }

      setUser(userRowToState(userRow as UsersRow, email));
      navigate('/main');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, setUser, navigate]);

  const goToSignUp = useCallback(() => navigate('/'), [navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    goToSignUp,
  };
}
