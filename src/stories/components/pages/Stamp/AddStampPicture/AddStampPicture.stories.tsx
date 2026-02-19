import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import AddStampPicture from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";

const meta: Meta<typeof AddStampPicture> = {
  title: "Pages/Stamp/AddStampPicture/AddStampPicture",
  component: AddStampPicture,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddStampPicture>;

export const Default: Story = {
  render: () => {
    const [upload, setUpload] = useState<string | null>(null);

    return <AddStampPicture upload={upload} onChangeUpload={setUpload} />;
  },
};
