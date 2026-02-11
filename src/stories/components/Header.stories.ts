import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from '@/components/layout/Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '기본 헤더',
  },
};
