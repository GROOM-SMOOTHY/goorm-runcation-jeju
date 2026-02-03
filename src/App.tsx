import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Button from "./components/common/Button";
import MainInput from './components/common/MainInput';
import TopNavigation from "./components/layout/TopNavigation";
import orange from './assets/orange.png';

import SearchInput from './components/common/SearchInput';
import LabeledInput from "./components/common/LabelInput";
import AdjustList from "./components/common/AdjustList";

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

  // 인풋 값 상태 관리
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <Button>기본 버튼</Button>

      <Button variant="fullcolor">풀컬러 버튼</Button>

      <Button variant="text">텍스트 버튼</Button>

      <Button size="large">큰 버튼</Button>

      <Button size="small">작은 버튼</Button>

      <Button loading>로딩 버튼</Button>

      <Button fullWidth>가로 100% 버튼</Button>

      <Button disabled>비활성화</Button>
    
      <MainInput
        value={keyword}
        placeholder="내용을 적어주세요"
        onChange={(e) => setKeyword(e.target.value)}
        onClear={() => setKeyword("")}
      />

      <SearchInput
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={(value) => {
          console.log("검색 실행:", value);
        }}
      />

      <LabeledInput
        label="이름"
        value={name}
        onChange={setName}
        style={{ backgroundColor: "#f5f5f5" }} // 추가 스타일 가능
      />

      <TopNavigation
        title="서브타이틀"
        onBack={() => console.log("뒤로가기")}
        rightElement={<img src={orange} width={35} />}
      />


      <AdjustList date={"2026.15.09"} content={"동해물산이 마르고 닳도록 해물산이 마르고 닳도록 동해물산이 마르고   닳도록 해물산이 마르고 닳도록"} 
      decide={"완료"}/>
       <AdjustList date={"2026.15.09"} content={"하느님이 보우하사 우리나라 만세"} 
      decide={"미완료"}/>
    </div>
  )
}

export default App

