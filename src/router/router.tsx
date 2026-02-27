import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import BackgroundLayout from "@/components/layout/BackgroundLayout/BackgroundLayout";
import TravelPage from "@/pages/TravelPage";
import StampPage from "@/pages/StampPage/StampPage";
import AddStampPage from "@/pages/AddStampPage/AddStampPage";
import GroupPage from "@/pages/GroupPage/GroupPage";
import MainPage from "@/pages/MainPage/MainPage";
import SignUp from "@/pages/SignUp/SignUp";

import LoginPage from "@/pages/LoginPage/LoginPage";
import SettlementMainPage from "@/pages/SettlementPage/SettlementMainPage/SettlementMainPage";
import SettlementAddPage from "@/pages/SettlementPage/SettlementAddPage/SettlementAddPage";
import SettlementListPage from "@/pages/SettlementPage/SettlementListPage/SettlementListPage";

import RestaurantStorePage from "@/pages/RestaurantStorePage/RestaurantStorePage";
import RestaurantListPage from "@/pages/RestaurantListPage/RestaurantListPage";

import StartPage from "@/pages/StartPage/StartPage";
import GuestBook from "@/pages/GuestBook/GuestBook";
import GroupJoinPage from "@/pages/GroupJoinPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<BackgroundLayout />}>
        <Route path="/" element={<StartPage />} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/login" element={<LoginPage />} />

        {/* 로그인 성공 후 메인 페이지 */}
        <Route path="/home" element={<HomePage />} />
        {/* 지역 스탬프 */}
        <Route path="/stamp" element={<StampPage />} />
        <Route path="/stamp/add" element={<AddStampPage />} />
        {/* 메인 */}
        <Route path="/travel" element={<TravelPage />} />
        {/* 그룹 페이지 */}
        <Route path="/group" element={<GroupPage />} />
        <Route path="/group/join/:groupId" element={<GroupJoinPage />} />

        {/* 메인 페이지 */}
        <Route path="/main" element={<MainPage />} />

        {/* 방명록 페이지 */}
        <Route path="/guestbook" element={<GuestBook />} />

        {/* 맛집 리스트 페이지 */}
        <Route path="/restaurants" element={<RestaurantListPage />} />

        {/* 맛집 리스트 상세 페이지 */}
        <Route
          path="/restaurants/:id-:slug"
          element={<RestaurantStorePage />}
        />

        {/* 정산 페이지 */}
        <Route path="/settlement/add" element={<SettlementAddPage />} />

        {/* 정산 목록 페이지 */}
        <Route path="/settlement/list" element={<SettlementListPage />} />

        {/* 정산 메인 페이지 */}
        <Route path="/settlement" element={<SettlementMainPage />} />

        {/* 정산 목록 추가하기 페이지 */}
        <Route path="/settlement/add" element={<SettlementAddPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
