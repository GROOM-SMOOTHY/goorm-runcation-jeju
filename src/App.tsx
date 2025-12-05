import { useState } from "react";
import Button from "./components/common/Button";
import Input from './components/common/Input';
import TopNavigation from "./components/layout/TopNavigation";
import orange from './assets/orange.png';


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
    </div>
  )
}

export default App