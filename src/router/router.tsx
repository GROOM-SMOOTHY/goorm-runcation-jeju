import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import BackgroundLayout from "@/components/layout/BackgroundLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<BackgroundLayout />}>
        {/* 첫 페이지 = 로그인 */}
        <Route path="/" element={<LoginPage />} />

        {/* 로그인 성공 후 메인 페이지 */}
        <Route path="/home" element={<HomePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
