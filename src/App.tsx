import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AppRouter from "./router/router";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";

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
    <>
      <AppRouter />
      <AnimatedToast />
    </>
  );
}


export default App;