import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from '@/components/ui/select';

const meta = {
  title: 'UI/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const DefaultStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="default"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      placeholder="Select an option"
    />
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

const WithLabelStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="withLabel"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Select Option"
      placeholder="Choose one"
    />
  );
};

export const WithLabel: Story = {
  render: () => <WithLabelStory />,
};

const RequiredStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="required"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Required Field"
      required
    />
  );
};

export const Required: Story = {
  render: () => <RequiredStory />,
};

const WithErrorStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="error"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Select with Error"
      error="This field is required"
    />
  );
};

export const WithError: Story = {
  render: () => <WithErrorStory />,
};

const WithHelpTextStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="helpText"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Select with Help"
      helpText="Choose the best option for you"
    />
  );
};

export const WithHelpText: Story = {
  render: () => <WithHelpTextStory />,
};

const DisabledStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="disabled"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Disabled Select"
      disabled
    />
  );
};

export const Disabled: Story = {
  render: () => <DisabledStory />,
};

const PreSelectedStory = () => {
  const [value, setValue] = useState('option2');
  return (
    <FormSelect
      name="preSelected"
      value={value}
      onChange={setValue}
      options={sampleOptions}
      label="Pre-selected Option"
    />
  );
};

export const PreSelected: Story = {
  render: () => <PreSelectedStory />,
};
