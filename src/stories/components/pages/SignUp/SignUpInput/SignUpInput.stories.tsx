import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";

type Props = React.ComponentProps<typeof SignUpInput>;

const meta: Meta<typeof SignUpInput> = {
  title: "Pages/SignUp/SignUpInput",
  component: SignUpInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["name", "phone"],
    },
    value: { control: false },
    onChange: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpInput>;

/**
 * Controlled Wrapper
 */
const ControlledTemplate = (args: Props) => {
  const [value, setValue] = useState("");

  return <SignUpInput {...args} value={value} onChange={setValue} />;
};

export const Name: Story = {
  render: ControlledTemplate,
  args: {
    type: "name",
  },
};

export const Phone: Story = {
  render: ControlledTemplate,
  args: {
    type: "phone",
  },
};
