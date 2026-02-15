import type { Meta, StoryObj } from "@storybook/react-vite";
import MemberAccountCard from "@/components/pages/settlement-main-page/MemberAcountCard/MemberAcountCard";

const meta = {
  title: "Pages/Settlement-main-page/MemberAccountCard",
  component: MemberAccountCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MemberAccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 멤버 카드 (3명만 표시, 더보기 가능)
export const Default: Story = {
  args: {
    members: [
      { name: "김민수", bank: "신한", accountNumber: "110-123-1234", color: "orange" },
      { name: "이지원", bank: "카카오", accountNumber: "333-12-5678", color: "blue" },
      { name: "박상준", bank: "우리", accountNumber: "1002-123-9012", color: "green" },
      { name: "최지훈", bank: "국민", accountNumber: "123-456-7890", color: "orange" },
      { name: "한서연", bank: "농협", accountNumber: "555-12-3456", color: "blue" },
    ],
  },
};

// 프로필 이미지 포함 예시
export const WithAvatars: Story = {
  args: {
    members: [
      {
        name: "김민수",
        bank: "신한",
        accountNumber: "110-123-1234",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "이지원",
        bank: "카카오",
        accountNumber: "333-12-5678",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      { name: "박상준", bank: "우리", accountNumber: "1002-123-9012", color: "green" },
    ],
  },
};

// 초록색 중심 멤버 카드 예시
export const GreenFocus: Story = {
  args: {
    members: [
      { name: "박상준", bank: "우리", accountNumber: "1002-123-9012", color: "green" },
      { name: "김민수", bank: "신한", accountNumber: "110-123-1234", color: "orange" },
      { name: "이지원", bank: "카카오", accountNumber: "333-12-5678", color: "blue" },
    ],
  },
};

// 더보기 테스트용 (많은 멤버)
export const ManyMembers: Story = {
  args: {
    members: [
      { name: "김민수", bank: "신한", accountNumber: "110-123-1234", color: "orange" },
      { name: "이지원", bank: "카카오", accountNumber: "333-12-5678", color: "blue" },
      { name: "박상준", bank: "우리", accountNumber: "1002-123-9012", color: "green" },
      { name: "최지훈", bank: "국민", accountNumber: "123-456-7890", color: "orange" },
      { name: "한서연", bank: "농협", accountNumber: "555-12-3456", color: "blue" },
      { name: "장예린", bank: "하나", accountNumber: "666-77-8888", color: "green" },
      { name: "홍길동", bank: "기업", accountNumber: "777-88-9999", color: "orange" },
    ],
  },
};
