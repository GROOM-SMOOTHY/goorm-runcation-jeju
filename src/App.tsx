import { useState } from "react";
import Button from "./components/common/Button";
import Input from './components/common/Input';
import TopNavigation from "./components/layout/TopNavigation";
import orange from './assets/orange.png';

import AdjustList from "./components/common/AdjustList";

function App() { 
  const [price, setPrice] = useState("");

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
    
      <Input
        placeholder="EX) 이권우"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onClear={() => setPrice("")}
      />
    
      <TopNavigation
        title="서브타이틀"
        onBack={() => console.log("뒤로가기")}
        rightElement={<img src={orange} width={35} />}
      />


      <AdjustList date={"2026.15.09"} content={"동해물산이 마르고 닳도록 해물산이 마르고 닳도록 동해물산이 마르고 닳도록 해물산이 마르고 닳도록"} 
      decide={"완료"}/>
       <AdjustList date={"2026.15.09"} content={"하느님이 보우하사 우리나라 만세"} 
      decide={"미완료"}/>
    </div>
  )
}

export default App

