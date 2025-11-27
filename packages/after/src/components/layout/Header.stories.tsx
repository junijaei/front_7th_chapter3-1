import type { Meta } from '@storybook/react';
import { Header } from '@/components/layout/Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

export const Default = {
  render: () => (
    <Header>
      <Header.Logo
        logo={{
          text: 'L',
          companyName: 'Company Name',
          projectName: 'Project Name',
        }}
      />
      <Header.User
        userInfo={{
          name: 'John Doe',
          email: 'john@example.com',
        }}
        avatar={{
          children: 'JD',
        }}
      />
    </Header>
  ),
};

export const Small = {
  render: () => (
    <Header size="sm">
      <Header.Logo
        logo={{
          text: 'S',
          companyName: 'Small Company',
          projectName: 'Small Project',
        }}
      />
      <Header.User
        userInfo={{
          name: 'Jane Smith',
          email: 'jane@example.com',
        }}
        avatar={{
          children: 'JS',
        }}
      />
    </Header>
  ),
};

export const Medium = {
  render: () => (
    <Header size="md">
      <Header.Logo
        logo={{
          text: 'M',
          companyName: 'Medium Company',
          projectName: 'Medium Project',
        }}
      />
      <Header.User
        userInfo={{
          name: 'Bob Johnson',
          email: 'bob@example.com',
        }}
        avatar={{
          children: 'BJ',
        }}
      />
    </Header>
  ),
};

export const Large = {
  render: () => (
    <Header size="lg">
      <Header.Logo
        logo={{
          text: 'L',
          companyName: 'Large Company',
          projectName: 'Large Project',
        }}
      />
      <Header.User
        userInfo={{
          name: 'Alice Brown',
          email: 'alice@example.com',
        }}
        avatar={{
          children: 'AB',
        }}
      />
    </Header>
  ),
};

export const WithImage = {
  render: () => (
    <Header>
      <Header.Logo
        logo={{
          text: 'L',
          companyName: 'Hanghae Company',
          projectName: 'Design System Project',
        }}
      />
      <Header.User
        userInfo={{
          name: 'Demo User',
          email: 'demo@example.com',
        }}
        avatar={{
          src: 'https://github.com/shadcn.png',
          alt: 'Demo User',
        }}
      />
    </Header>
  ),
};

export const CustomMaxWidth = {
  render: () => (
    <Header maxWidth="lg">
      <Header.Logo
        logo={{
          text: 'C',
          companyName: 'Custom Width',
          projectName: 'Limited Container',
        }}
      />
      <Header.User
        userInfo={{
          name: 'Test User',
          email: 'test@example.com',
        }}
        avatar={{
          children: 'TU',
        }}
      />
    </Header>
  ),
};

export const WithContent = {
  render: () => (
    <div>
      <Header>
        <Header.Logo
          logo={{
            text: 'H',
            companyName: 'Hanghae Company',
            projectName: 'Design System Migration Project',
          }}
        />
        <Header.User
          userInfo={{
            name: 'Demo User',
            email: 'demo@example.com',
          }}
          avatar={{
            children: 'DU',
          }}
        />
      </Header>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Page Content</h1>
        <p className="mt-2 text-gray-600">
          This demonstrates how the header looks with page content below it.
        </p>
        <p className="mt-4 text-gray-600">
          The header is sticky and will remain at the top when scrolling.
        </p>
      </main>
    </div>
  ),
};
