import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/components/composed/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'Composed/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    showFooter: {
      control: 'boolean',
    },
    showCloseButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
        <p>This is the modal content. You can put anything here.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

const WithDescriptionStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal with Description"
        description="This is a helpful description that explains what this modal is about."
      >
        <p>Modal content goes here.</p>
      </Modal>
    </>
  );
};

export const WithDescription: Story = {
  render: () => <WithDescriptionStory />,
};

const WithFooterStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Modal>
    </>
  );
};

export const WithFooter: Story = {
  render: () => <WithFooterStory />,
};

const SmallStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="small">
        <p>This is a small modal.</p>
      </Modal>
    </>
  );
};

export const Small: Story = {
  render: () => <SmallStory />,
};

const MediumStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Medium Modal" size="medium">
        <p>This is a medium modal (default size).</p>
      </Modal>
    </>
  );
};

export const Medium: Story = {
  render: () => <MediumStory />,
};

const LargeStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="large">
        <p>This is a large modal with more space for content.</p>
        <p>You can add more complex content here.</p>
      </Modal>
    </>
  );
};

export const Large: Story = {
  render: () => <LargeStory />,
};

const WithFormStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create User"
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input placeholder="Enter username" />
          <Input type="email" placeholder="Enter email" />
          <Input type="password" placeholder="Enter password" />
        </div>
      </Modal>
    </>
  );
};

export const WithForm: Story = {
  render: () => <WithFormStory />,
};

const NoCloseButtonStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="No Close Button"
        showCloseButton={false}
        showFooter
        footerContent={
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            OK
          </Button>
        }
      >
        <p>This modal has no close button. You must click OK to close it.</p>
      </Modal>
    </>
  );
};

export const NoCloseButton: Story = {
  render: () => <NoCloseButtonStory />,
};
