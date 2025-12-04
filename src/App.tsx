import './App.css'
import MainButton from "./components/common/mainbutton";

function App() {

  return (
    <div style={{ padding: 20 }}>
      <MainButton>기본 버튼</MainButton>

      <MainButton variant="outlined">아웃라인 버튼</MainButton>

      <MainButton variant="text">텍스트 버튼</MainButton>

      <MainButton size="large">큰 버튼</MainButton>

      <MainButton size="small">작은 버튼</MainButton>

      <MainButton loading>로딩 버튼</MainButton>

      <MainButton fullWidth>가로 100% 버튼</MainButton>

      <MainButton disabled>비활성화</MainButton>
    </div>
  )
}

export default App
