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

/* onChangeUpload 파라미터 타입 추출 */
type AddPhoto = Parameters<
  React.ComponentProps<typeof AddStampPicture>["onChangeUpload"]
>[0];

export const Default: Story = {
  render: () => {
    const [upload, setUpload] = useState<string | null>(null);

    const handleChangeUpload = (data: AddPhoto) => {
      setUpload(data?.url ?? null);
    };

    return (
      <AddStampPicture upload={upload} onChangeUpload={handleChangeUpload} />
    );
  },
};
