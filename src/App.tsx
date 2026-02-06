import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";

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
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

}
export default App;
