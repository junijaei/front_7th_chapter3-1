import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '@/components/ui/stat-card';

const meta = {
  title: 'UI/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'gray'],
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '전체',
    value: 150,
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    label: '활성',
    value: 120,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: '비활성',
    value: 25,
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: '정지',
    value: 5,
    variant: 'danger',
  },
};

export const Gray: Story = {
  args: {
    label: '관리자',
    value: 8,
    variant: 'gray',
  },
};

export const LargeNumber: Story = {
  args: {
    label: '총 조회수',
    value: 1234567,
    variant: 'default',
  },
};

export const StringValue: Story = {
  args: {
    label: '상태',
    value: 'Active',
    variant: 'success',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
      <StatCard variant="default" label="전체" value={150} />
      <StatCard variant="success" label="활성" value={120} />
      <StatCard variant="warning" label="비활성" value={25} />
      <StatCard variant="danger" label="정지" value={5} />
      <StatCard variant="gray" label="관리자" value={8} />
    </div>
  ),
};
