import { useState } from "react";
import MainButton from "./components/common/MainButton";
import MainInput from './components/common/MainInput';
import TopNavigation from "./components/common/TopNavigation";


function App() {
  const [price, setPrice] = useState("");
  return (
    <div style={{ padding: 20 }}>
      <MainButton>기본 버튼</MainButton>

      <MainButton variant="fullcolor">풀컬러 버튼</MainButton>

      <MainButton variant="text">텍스트 버튼</MainButton>

      <MainButton size="large">큰 버튼</MainButton>

      <MainButton size="small">작은 버튼</MainButton>

      <MainButton loading>로딩 버튼</MainButton>

      <MainButton fullWidth>가로 100% 버튼</MainButton>

      <MainButton disabled>비활성화</MainButton>
    
      <MainInput
        placeholder="EX) 이권우"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onClear={() => setPrice("")}
      />
    
      <TopNavigation
        title="서브타이틀"
        onBack={() => console.log("뒤로가기")}
        rightElement={<img src={"/src/assets/orange.png"} width={35} />}
      />
    </div>
  )
}

export default App
