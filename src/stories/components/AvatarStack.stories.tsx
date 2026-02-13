import type { Meta, StoryObj } from "@storybook/react-vite";
import AvatarStack from "@/components/common/AvatarStack";

const meta = {
  title: "Components/AvatarStack",
  component: AvatarStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    totalCount: { control: { type: "number", min: 1, max: 20 } },
    visibleCount: { control: { type: "number", min: 1, max: 5 } },
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
];

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
    totalCount: 8,
    visibleCount: 2,
    size: "md",
  },
};

export const SizeSm: Story = {
  args: {
    avatars: sampleAvatars,
    totalCount: 6,
    visibleCount: 2,
    size: "sm",
  },
};

export const SizeMd: Story = {
  args: {
    avatars: sampleAvatars,
    totalCount: 8,
    visibleCount: 2,
    size: "md",
  },
};

export const SizeLg: Story = {
  args: {
    avatars: sampleAvatars,
    totalCount: 10,
    visibleCount: 2,
    size: "lg",
  },
};

export const ThreeVisible: Story = {
  args: {
    avatars: sampleAvatars,
    totalCount: 10,
    visibleCount: 3,
    size: "md",
  },
};

export const NoRemaining: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 2),
    totalCount: 2,
    visibleCount: 2,
    size: "md",
  },
};
