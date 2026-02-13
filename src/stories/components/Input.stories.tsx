import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '@/components/common/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        variant="default"
        value={value}
        onChange={setValue}
        required
      />
    );
  },
};

export const AuthCodeInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        variant="auth"
        value={value}
        onChange={setValue}
        onAuthRequest={() => console.log('인증 요청됨')}
        required
      />
    );
  },
};
