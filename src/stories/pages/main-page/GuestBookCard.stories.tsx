import GuestBookCard from "@/components/pages/main-page/GuestBookCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/MainPage/GuestBookCard",
    component: GuestBookCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        title: {
            control: "text",
            description: "카드 제목",
        },
        description: {
            control: "text",
            description: "설명",
        },
        image: {
            control: "text",
            description: "이미지 URL",
        },
        course: {
            control: "text",
            description: "코스명",
        },
        generation: {
            control: "number",
            description: "기수",
        },
    },
} satisfies Meta<typeof GuestBookCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "김나영님",
        description: "레전드 맛집있음\n꼭 가는거 추천합니다~~",
        image: "https://picsum.photos/160/160",
        course: "FE",
        generation: 7,
    },
};

export const LongDescription: Story = {
    args: {
        title: "김영숙님",
        description:
            "함께 달리고 맛있는 음식도 먹고! 제주에서 특별한 추억을 만들었어요. 다음 기수에도 참여하고 싶습니다.",
        image: "https://picsum.photos/320/180?random=2",
        course: "백엔드",
        generation: 2,
    },
};
