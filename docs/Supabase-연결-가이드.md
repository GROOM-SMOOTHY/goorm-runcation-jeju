# Supabase 프로젝트 연결 가이드

## 1. 개요

- **프로젝트**: React + Vite + TypeScript
- **목적**: Supabase를 백엔드(DB, Auth, Storage 등)로 사용하기 위한 클라이언트 연결

---

## 2. 설치된 패키지

| 패키지 | 용도 |
|--------|------|
| `@supabase/supabase-js` | Supabase JavaScript 클라이언트 (이미 설치됨) |

---

## 3. 프로젝트에 추가된 파일

### 3-1. Supabase 클라이언트 (`src/lib/supabase.ts`)

- 앱 전체에서 **한 번만** 생성하는 Supabase 클라이언트
- 환경 변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 사용
- 값이 없으면 에러 메시지로 안내

**코드:**

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL과 Anon Key가 필요합니다. .env 파일에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 설정해 주세요.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3-2. 환경 변수 예시 (`.env.example`)

- 실제 값 대신 **예시**만 적어 둔 파일
- 팀원/본인이 `.env` 만들 때 참고용

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3-3. .gitignore 수정

- `.env`, `.env.local`, `.env.*.local` 추가
- **비밀키가 Git에 올라가지 않도록** 하기 위함

---

## 4. 설정 방법 (해야 할 일)

### Step 1. Supabase 대시보드에서 값 복사

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 사용할 **프로젝트** 선택
3. 왼쪽 메뉴 **Settings** → **API** 이동
4. 아래 값 복사:
   - **Project URL** → `VITE_SUPABASE_URL` 로 사용
   - **Project API keys** 중 **anon public** → `VITE_SUPABASE_ANON_KEY` 로 사용

### Step 2. 프로젝트 루트에 `.env` 파일 생성

- `.env.example`을 참고해서 **실제 값**으로 작성

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3. 개발 서버 재시작

- `.env`를 수정한 뒤에는 **반드시** `npm run dev` 다시 실행
- Vite는 실행 시점에만 환경 변수를 읽음

---

## 5. 사용 방법

- 필요한 컴포넌트/파일에서 `supabase`를 import해서 사용

**예시 (테이블 조회):**

```ts
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase.from('테이블명').select('*');
```

**예시 (Auth):**

```ts
import { supabase } from '@/lib/supabase';

await supabase.auth.signInWithPassword({ email, password });
```

---

## 6. 주의사항

- **anon key**는 프론트엔드에 노출되어도 되는 공개 키 (Row Level Security로 보안 관리)
- **service_role key**는 절대 프론트엔드나 `.env`에 넣지 말 것 (서버 전용)
- `.env` 파일은 Git에 커밋하지 않음 (이미 .gitignore에 포함됨)
