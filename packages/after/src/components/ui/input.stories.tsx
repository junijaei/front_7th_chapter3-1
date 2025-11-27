import type { Meta } from '@storybook/react';
import { Input } from '@/components/ui/Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Label = {
  args: {
    label: 'Email',
    placeholder: 'Enter email...',
  },
};

export const RequiredLabel = {
  args: {
    label: 'Email',
    placeholder: 'Enter email...',
    required: true,
  },
};

export const Disabled = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue = {
  args: {
    defaultValue: 'Pre-filled value',
  },
};

export const AllTypes = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input placeholder="Disabled input" disabled />
    </div>
  ),
};
