import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PaymentsMembers from "@/components/pages/settlement-add-history-page/PaymentsMembers/PaymentsMembers";
import type { Member } from "@/components/pages/settlement-add-history-page/PaymentsMembers/PaymentsMembers";

const mockMembers: Member[] = [
  {
    id: "1",
    userId: "1",
    name: "김민수",
    profileSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    userId: "2",
    name: "박지훈",
    profileSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    userId: "3",
    name: "이예슬",
    profileSrc: "https://i.pravatar.cc/150?img=3",
  },
];

const StatefulPaymentsMembers = ({
  initialMembers,
}: {
  initialMembers: Member[];
}) => {
  const [selectedMembers, setSelectedMembers] =
    useState<Member[]>(initialMembers);

  return (
    <PaymentsMembers
      selectedMembers={selectedMembers}
      onChangeMembers={setSelectedMembers}
    />
  );
};

const meta = {
  title: "Pages/Settlement-add-history-page/PaymentsMembers",
  component: PaymentsMembers,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentsMembers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StatefulPaymentsMembers initialMembers={[]} />,
};

export const WithSelectedMembers: Story = {
  render: () => <StatefulPaymentsMembers initialMembers={[mockMembers[0]]} />,
};

export const MultipleSelected: Story = {
  render: () => (
    <StatefulPaymentsMembers initialMembers={mockMembers.slice(0, 2)} />
  ),
};
