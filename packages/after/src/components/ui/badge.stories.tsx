import type { Meta } from '@storybook/react';
import { Badge } from '@/components/ui/Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'destructive', 'warning', 'info', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

export const Default = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Success = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Destructive = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Warning = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Info = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
