import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PaymentsMembers, {
  type Member,
} from "@/components/pages/settlement-add-history-page/PaymentsMembers/PaymentsMembers";
import { mockMembers as rawMembers } from "@/components/pages/settlement-add-history-page/PaymentsMembers/data";

/* data.ts → PaymentsMembers 타입 변환 */
const mockMembers: Member[] = rawMembers.map((m, i) => ({
  id: String(i),
  userId: String(m.userId),
  name: m.name,
  profileSrc: m.profileSrc ?? null,
}));

function StatefulPaymentsMembers({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const [selectedMembers, setSelectedMembers] =
    useState<Member[]>(initialMembers);

  return (
    <PaymentsMembers
      selectedMembers={selectedMembers}
      onChangeMembers={(members) => setSelectedMembers(members)}
    />
  );
}

const meta = {
  title: "pages/settlement-add-history-page/PaymentsMembers",
  component: PaymentsMembers,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentsMembers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedMembers: [],
  },
  render: (args) => (
    <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
  ),
};

export const WithOneMember: Story = {
  args: {
    selectedMembers: [mockMembers[0]],
  },
  render: (args) => (
    <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
  ),
};

export const WithMultipleMembers: Story = {
  args: {
    selectedMembers: mockMembers.slice(0, 3),
  },
  render: (args) => (
    <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
  ),
};
