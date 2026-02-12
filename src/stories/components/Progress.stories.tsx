import type { Meta, StoryObj } from '@storybook/react-vite';
import Progress from '@/components/common/Progress/Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
    onValueChange: (value: number) => {
      console.log(value);
    },
  },
  render: ({ progress, onValueChange }) => <Progress progress={progress} onValueChange={onValueChange} />
};