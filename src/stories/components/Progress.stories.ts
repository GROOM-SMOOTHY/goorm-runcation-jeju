import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressDemo from '@/components/common/Progress/Progress';

const meta = {
  title: 'Components/Progress',
  component: ProgressDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};