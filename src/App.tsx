import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
// import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import BackgroundLayout from "@/components/layout/BackgroundLayout";

function App() {
  // Supabase 연결 확인 (앱 로드 시 한 번만)
  useEffect(() => {
    supabase.auth.getSession().then(({ error }) => {
      if (error) {
        console.warn("[Supabase] 연결 실패:", error.message);
      } else {
        console.log("[Supabase] 연결됨");
      }
    });
  }, []);

  return (
    <Routes>
      <Route element={<BackgroundLayout />}>
        {/* 첫 페이지 = 로그인 */}
        <Route path="/" element={<HomePage />} />

        {/* 로그인 성공 후 메인 페이지 */}
        <Route path="/home" element={<HomePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
