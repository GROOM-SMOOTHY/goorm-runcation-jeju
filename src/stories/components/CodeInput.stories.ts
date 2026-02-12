import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeInput from '@/components/common/CodeInput';

const meta = {
  title: 'Layout/CodeInput',
  component: CodeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '기본 헤더',
  },
};