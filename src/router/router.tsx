import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import BackgroundLayout from "@/components/layout/BackgroundLayout/BackgroundLayout";
import TravelPage from "@/pages/TravelPage";
import StampPage from "@/pages/StampPage";
import GroupPage from "@/pages/GruopPage/GroupPage";
import MainPage from "@/pages/MainPage/MainPage";
import RestaurantStorePage from "@/pages/RestaurantStorePage/RestaurantStorePage";
import RestaurantListPage from "@/pages/RestaurantListPage/RestaurantListPage";
import StartPage from "@/pages/StartPage/StartPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<BackgroundLayout />}>
        {/* 첫 페이지 = 로그인 */}
        <Route path="/" element={<StartPage />} />

        {/* 로그인 성공 후 메인 페이지 */}
        <Route path="/home" element={<HomePage />} />

        {/* 지역 스탬프 */}
        <Route path="/stamp" element={<StampPage />} />

        {/* 메인 */}
        <Route path="/travel" element={<TravelPage />} />

        {/* 그룹 페이지 */}
        <Route path="/group" element={<GroupPage />} />

        {/* 메인 페이지 */}
        <Route path="/main" element={<MainPage />} />

        {/* 맛집 리스트 페이지 */}
        <Route path="/restaurants" element={<RestaurantListPage />} />

        {/* 맛집 리스트 상세 페이지 */}
        <Route
          path="/restaurants/:id-:slug"
          element={<RestaurantStorePage />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
