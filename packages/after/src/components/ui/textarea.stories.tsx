import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormTextarea } from '@/components/ui/textarea';

const meta = {
  title: 'UI/FormTextarea',
  component: FormTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="default"
        value={value}
        onChange={setValue}
        placeholder="Enter your text..."
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="withLabel"
        value={value}
        onChange={setValue}
        label="Description"
        placeholder="Enter description..."
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="required"
        value={value}
        onChange={setValue}
        label="Required Field"
        placeholder="This field is required..."
        required
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="error"
        value={value}
        onChange={setValue}
        label="Comment"
        placeholder="Enter comment..."
        error="Comment must be at least 10 characters"
      />
    );
  },
};

export const WithHelpText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="helpText"
        value={value}
        onChange={setValue}
        label="Feedback"
        placeholder="Share your feedback..."
        helpText="Your feedback helps us improve"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="disabled"
        value={value}
        onChange={setValue}
        label="Disabled Textarea"
        placeholder="This is disabled..."
        disabled
      />
    );
  },
};

export const CustomRows: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormTextarea
        name="customRows"
        value={value}
        onChange={setValue}
        label="Large Text Area"
        placeholder="Enter a lot of text..."
        rows={8}
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('This is pre-filled content.\nYou can edit it freely.');
    return (
      <FormTextarea name="withValue" value={value} onChange={setValue} label="Pre-filled Content" />
    );
  },
};
