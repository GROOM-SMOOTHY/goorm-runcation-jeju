import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeInput from '@/components/common/CodeInput/CodeInput';

const meta = {
  title: 'Components/CodeInput',
  component: CodeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};