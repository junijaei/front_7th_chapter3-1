import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FormSelect } from '@/components/ui/Select';

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
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      placeholder="Select an option"
    />
  );
};

export const Default = {
  render: () => <DefaultStory />,
};

const WithLabelStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="withLabel"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Select Option"
      placeholder="Choose one"
    />
  );
};

export const WithLabel = {
  render: () => <WithLabelStory />,
};

const RequiredStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="required"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Required Field"
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
    <FormSelect
      name="error"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Select with Error"
      error="This field is required"
    />
  );
};

export const WithError = {
  render: () => <WithErrorStory />,
};

const WithHelpTextStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="helpText"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Select with Help"
      helpText="Choose the best option for you"
    />
  );
};

export const WithHelpText = {
  render: () => <WithHelpTextStory />,
};

const DisabledStory = () => {
  const [value, setValue] = useState('');
  return (
    <FormSelect
      name="disabled"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Disabled Select"
      disabled
    />
  );
};

export const Disabled = {
  render: () => <DisabledStory />,
};

const PreSelectedStory = () => {
  const [value, setValue] = useState('option2');
  return (
    <FormSelect
      name="preSelected"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={sampleOptions}
      label="Pre-selected Option"
    />
  );
};

export const PreSelected = {
  render: () => <PreSelectedStory />,
};
