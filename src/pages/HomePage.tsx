import TopNav from "@/components/layout/TopNavigation";
import orange from "@/assets/icons/commen_Icons/orange.png";

export default function HomePage() {
  return (
    <>
      <TopNav
        onBack={() => console.log("뒤로가기")}
        rightElement={<img src={orange} width={50} height={50} alt="메뉴"/>}
      />
      <main style={{ padding: "16px" }}>
        <h1>홈</h1>
      </main>
    </>
  );
}
