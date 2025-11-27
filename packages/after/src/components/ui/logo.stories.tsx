import type { Meta } from '@storybook/react';
import { Logo } from '@/components/ui/Logo';

const meta = {
  title: 'UI/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent'],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;

export const Default = {
  args: {
    text: 'L',
    companyName: 'Company Name',
    projectName: 'Project Name',
  },
};

export const IconOnly = {
  args: {
    text: 'L',
  },
};

export const WithCompany = {
  args: {
    text: 'H',
    companyName: 'Hanghae Company',
  },
};

export const WithProject = {
  args: {
    text: 'D',
    projectName: 'Design System',
  },
};

export const Small = {
  args: {
    text: 'S',
    companyName: 'Small Company',
    projectName: 'Small Project',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    text: 'M',
    companyName: 'Medium Company',
    projectName: 'Medium Project',
    size: 'md',
  },
};

export const Large = {
  args: {
    text: 'L',
    companyName: 'Large Company',
    projectName: 'Large Project',
    size: 'lg',
  },
};

export const Primary = {
  args: {
    text: 'P',
    companyName: 'Primary Brand',
    projectName: 'Main Project',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    text: 'S',
    companyName: 'Secondary Brand',
    projectName: 'Alt Project',
    variant: 'secondary',
  },
};

export const Accent = {
  args: {
    text: 'A',
    companyName: 'Accent Brand',
    projectName: 'Special Project',
    variant: 'accent',
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Logo text="S" companyName="Small Size" projectName="Small Project" size="sm" />
      <Logo text="M" companyName="Medium Size" projectName="Medium Project" size="md" />
      <Logo text="L" companyName="Large Size" projectName="Large Project" size="lg" />
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Logo text="P" companyName="Primary" projectName="Primary Variant" variant="primary" />
      <Logo text="S" companyName="Secondary" projectName="Secondary Variant" variant="secondary" />
      <Logo text="A" companyName="Accent" projectName="Accent Variant" variant="accent" />
    </div>
  ),
};

export const RealWorld = {
  render: () => (
    <Logo
      text="H"
      companyName="Hanghae Company"
      projectName="Design System Migration Project"
      size="md"
      variant="primary"
    />
  ),
};
