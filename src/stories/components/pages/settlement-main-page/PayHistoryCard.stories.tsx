import PayHistoryCard from "@/components/pages/settlement-main-page/PayHistoryCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/SettlementMainPage/PayHistoryCard",
    component: PayHistoryCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        imgUrl: {
            control: "text",
            description: "이미지 URL",
        },
        title: {
            control: "text",
            description: "결제 내역 제목",
        },
        date: {
            control: "text",
            description: "날짜",
        },
        userName: {
            control: "text",
            description: "결제자 이름",
        },
        price: {
            control: "number",
            description: "총 금액",
        },
        myPrice: {
            control: "number",
            description: "내 정산 금액",
        },
    },
} satisfies Meta<typeof PayHistoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        imgUrl: "https://picsum.photos/80/80",
        title: "제주 맛집 회식",
        date: "2024.01.15",
        userName: "김나영",
        price: 120000,
        myPrice: 30000,
    },
};

export const LargeTitle: Story = {
    args: {
        imgUrl: "https://picsum.photos/80/80?random=2",
        title: "제주도 돌하르방 렌트카 20일 예약금액",
        date: "2024.02.01",
        userName: "이철수",
        price: 350000,
        myPrice: 87500,
    },
};
