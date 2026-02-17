import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PaymentsMembers from "@/components/pages/settlement-add-history-page/PaymentsMembers/PaymentsMembers";
import { mockMembers } from "@/components/pages/settlement-add-history-page/PaymentsMembers/data";

type Member = { profileSrc: string; name: string };

/** 스토리에서 선택된 멤버를 상태로 관리하는 래퍼 */
function StatefulPaymentsMembers({ initialMembers }: { initialMembers: Member[] }) {
    const [selectedMembers, setSelectedMembers] = useState<Member[]>(initialMembers);
    return (
        <PaymentsMembers
            selectedMembers={selectedMembers}
            onChangeMembers={setSelectedMembers}
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
    argTypes: {
        selectedMembers: {
            description: "함께한 멤버 목록 (초기값)",
            control: false,
        },
    },
} satisfies Meta<typeof PaymentsMembers>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 선택된 멤버가 없을 때 — 추가 버튼으로 멤버 추가 가능 */
export const Default: Story = {
    args: {
        selectedMembers: [],
    },
    render: (args) => (
        <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
    ),
};

/** 멤버 1명 선택된 상태 — 칩 X로 제거·+로 추가 가능 */
export const WithOneMember: Story = {
    args: {
        selectedMembers: [mockMembers[0]],
    },
    render: (args) => (
        <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
    ),
};

/** 멤버 여러 명 선택된 상태 */
export const WithMultipleMembers: Story = {
    args: {
        selectedMembers: mockMembers.slice(0, 3),
    },
    render: (args) => (
        <StatefulPaymentsMembers initialMembers={args.selectedMembers ?? []} />
    ),
};
