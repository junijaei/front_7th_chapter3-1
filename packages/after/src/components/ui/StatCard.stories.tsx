import type { Meta } from '@storybook/react';
import { StatCard } from '@/components/ui/StatCard';

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

export const Default = {
  args: {
    label: '전체',
    value: 150,
    variant: 'default',
  },
};

export const Success = {
  args: {
    label: '활성',
    value: 120,
    variant: 'success',
  },
};

export const Warning = {
  args: {
    label: '비활성',
    value: 25,
    variant: 'warning',
  },
};

export const Danger = {
  args: {
    label: '정지',
    value: 5,
    variant: 'danger',
  },
};

export const Gray = {
  args: {
    label: '관리자',
    value: 8,
    variant: 'gray',
  },
};

export const LargeNumber = {
  args: {
    label: '총 조회수',
    value: 1234567,
    variant: 'default',
  },
};

export const StringValue = {
  args: {
    label: '상태',
    value: 'Active',
    variant: 'success',
  },
};

export const AllVariants = {
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
