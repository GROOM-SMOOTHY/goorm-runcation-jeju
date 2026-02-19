import WeatherPanel from "@/components/pages/main-page/WeatherPanel";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/MainPage/WeatherPanel",
    component: WeatherPanel,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        degree: {
            control: "number",
            description: "온도",
        },
        weather: {
            control: "text",
            description: "날씨",
        },
    },
} satisfies Meta<typeof WeatherPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        degree: 25,
        weather: "맑음",
    },
};