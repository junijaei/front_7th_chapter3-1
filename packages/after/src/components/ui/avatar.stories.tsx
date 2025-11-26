import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/ui/avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'AB',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User Avatar',
  },
};

export const Small: Story = {
  args: {
    children: 'SM',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'MD',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'LG',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'XL',
    size: 'xl',
  },
};

export const Primary: Story = {
  args: {
    children: 'PR',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'SC',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'SU',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'WA',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'ER',
    variant: 'error',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">SM</Avatar>
      <Avatar size="md">MD</Avatar>
      <Avatar size="lg">LG</Avatar>
      <Avatar size="xl">XL</Avatar>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Avatar variant="default">DF</Avatar>
      <Avatar variant="primary">PR</Avatar>
      <Avatar variant="secondary">SC</Avatar>
      <Avatar variant="success">SU</Avatar>
      <Avatar variant="warning">WA</Avatar>
      <Avatar variant="error">ER</Avatar>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://github.com/shadcn.png" alt="User 1" size="sm" />
      <Avatar src="https://github.com/shadcn.png" alt="User 2" size="md" />
      <Avatar src="https://github.com/shadcn.png" alt="User 3" size="lg" />
      <Avatar src="https://github.com/shadcn.png" alt="User 4" size="xl" />
    </div>
  ),
};
