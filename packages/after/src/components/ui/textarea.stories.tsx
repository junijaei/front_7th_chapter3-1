import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FormTextarea } from '@/components/ui/Textarea';

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

const DefaultStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormTextarea
      name="default"
      value={value}
      onChange={setValue}
      placeholder="Enter your text..."
    />
  );
};

export const Default = {
  render: () => <DefaultStory />,
};

const WithLabelStory = () => {
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
};

export const WithLabel = {
  render: () => <WithLabelStory />,
};

const RequiredStory = () => {
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
};

export const Required = {
  render: () => <RequiredStory />,
};

const WithErrorStory = () => {
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
};

export const WithError = {
  render: () => <WithErrorStory />,
};

const WithHelpTextStory = () => {
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
};

export const WithHelpText = {
  render: () => <WithHelpTextStory />,
};

const DisabledStory = () => {
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
};

export const Disabled = {
  render: () => <DisabledStory />,
};

const CustomRowsStory = () => {
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
};

export const CustomRows = {
  render: () => <CustomRowsStory />,
};

const WithValueStory = () => {
  const [value, setValue] = useState('This is pre-filled content.\nYou can edit it freely.');
  return (
    <FormTextarea name="withValue" value={value} onChange={setValue} label="Pre-filled Content" />
  );
};

export const WithValue = {
  render: () => <WithValueStory />,
};
