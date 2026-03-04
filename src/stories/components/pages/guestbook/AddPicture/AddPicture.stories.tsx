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

export const Default: Story = {
  render: () => {
    const [images, setImages] = useState<string[]>([]);

    const handleAdd = (data: { url: string; file: File }) => {
      if (images.length >= 4) return;
      setImages((prev) => [...prev, data.url]);
    };

    const handleRemove = (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <AddPicture images={images} onAdd={handleAdd} onRemove={handleRemove} />
    );
  },
};
