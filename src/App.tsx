import { useState } from "react";
import Button from "./components/common/Button";
import MainInput from './components/common/MainInput';
import TopNavigation from "./components/layout/TopNavigation";
import orange from './assets/orange.png';
import SearchInput from './components/common/SearchInput';
import LabeledInput from "./components/common/LabelInput";

/**
 * Root application component that renders demo UI controls: multiple Button variants, a MainInput bound to `keyword`, a SearchInput bound to `searchKeyword`, and a TopNavigation bar.
 *
 * The component manages local state for `keyword` and `searchKeyword` and wires input change/clear/search handlers to those states.
 *
 * @returns A JSX element containing the app's demo UI (buttons, inputs, and top navigation).
 */
function App() { 
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
    </div>
  )
}

export default App