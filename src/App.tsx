import { useState } from "react";
import Button from "./components/common/Button";
import Input from './components/common/Input';
import TopNavigation from "./components/layout/TopNavigation";
import orange from './assets/orange.png';
import ListItem from "./components/common/List";


/**
 * Root application component demonstrating sample UI elements and input state.
 *
 * Renders a collection of Button variants, an Input bound to local state, a TopNavigation bar, and example ListItem entries.
 *
 * @returns The root JSX element for the app's demo UI
 */
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

      <ListItem
        date="2025.12.09"
        title="제주 해장국 동해물과 백두ㅇㅍㄴㅇㅀㅁㄴㅇ산이dfdfadfadfdfadfdfafadfasdfasdf"
        status="done"
      />
      <ListItem
        date="2025.12.09"
        title="제주 해장국"
        status="yet"
      />
    </div>
  )
}

export default App