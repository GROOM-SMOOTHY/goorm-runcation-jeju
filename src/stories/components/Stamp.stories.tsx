import type { Meta, StoryObj } from "@storybook/react-vite";
import Stamp from "@/components/Stamp/Stamp";

const meta: Meta<typeof Stamp> = {
  title: "Components/Stamp",
  component: Stamp,
  tags: ["autodocs"],

  args: {
    region: "",
    imgUrl: "",
    date: "",
    activeColor: "#FF8800",
    status: "locked",
  },

  argTypes: {
    region: {
      control: "text",
      description: "지역명",
    },
    imgUrl: {
      control: "text",
      description: "등록된 이미지 URL",
    },
    date: {
      control: "text",
      description: "사진 등록 날짜",
    },
    activeColor: {
      control: "color",
      description: "활성화 시 점선 색상",
    },
    status: {
      control: "radio",
      options: ["active", "locked"],
      description: "스탬프 상태",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stamp>;

export const Playground: Story = {
  render: (args) => (
    <div>
      <Stamp {...args} />
    </div>
  ),
};

export const Active: Story = {
  args: {
    status: "active",
    region: "애월",
    imgUrl: "https://picsum.photos/200",
    date: "2025.10.10",
  },
};
