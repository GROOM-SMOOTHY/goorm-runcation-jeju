import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import AddPicture from "@/components/pages/guestbook/AddPicture/AddPicture";

const meta: Meta<typeof AddPicture> = {
  title: "Pages/AddPicture/AddPicture",
  component: AddPicture,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddPicture>;

// AddPicture의 onAdd 타입 자동 추출
type AddFile = Parameters<React.ComponentProps<typeof AddPicture>["onAdd"]>[0];

export const Default: Story = {
  render: () => {
    const [images, setImages] = useState<string[]>([]);

    const handleAdd = (data: AddFile) => {
      setImages((prev) => {
        if (prev.length >= 4) return prev;
        return [...prev, data.url];
      });
    };

    const handleRemove = (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <AddPicture images={images} onAdd={handleAdd} onRemove={handleRemove} />
    );
  },
};
