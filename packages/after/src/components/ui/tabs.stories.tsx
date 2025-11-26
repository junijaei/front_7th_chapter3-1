import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Tab 1 Content</h3>
          <p className="text-gray-600">This is the content for the first tab.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Tab 2 Content</h3>
          <p className="text-gray-600">This is the content for the second tab.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Tab 3 Content</h3>
          <p className="text-gray-600">This is the content for the third tab.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="posts" className="w-96">
      <TabsList>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Posts Management</h3>
          <p className="text-gray-600">Manage your posts here.</p>
        </div>
      </TabsContent>
      <TabsContent value="users">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Users Management</h3>
          <p className="text-gray-600">Manage your users here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overview</h3>
            <Button size="sm">Action</Button>
          </div>
          <p className="text-gray-600">Dashboard overview content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <Button size="sm">Export</Button>
          </div>
          <p className="text-gray-600">Analytics data and charts would be displayed here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Settings</h3>
            <Button size="sm">Save</Button>
          </div>
          <p className="text-gray-600">Application settings and preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          All
        </TabsTrigger>
        <TabsTrigger value="active" className="flex-1">
          Active
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex-1">
          Completed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">All items will be shown here.</p>
        </div>
      </TabsContent>
      <TabsContent value="active">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Active items will be shown here.</p>
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Completed items will be shown here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="1" className="w-full">
      <TabsList>
        <TabsTrigger value="1">Tab 1</TabsTrigger>
        <TabsTrigger value="2">Tab 2</TabsTrigger>
        <TabsTrigger value="3">Tab 3</TabsTrigger>
        <TabsTrigger value="4">Tab 4</TabsTrigger>
        <TabsTrigger value="5">Tab 5</TabsTrigger>
        <TabsTrigger value="6">Tab 6</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 1</p>
        </div>
      </TabsContent>
      <TabsContent value="2">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 2</p>
        </div>
      </TabsContent>
      <TabsContent value="3">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 3</p>
        </div>
      </TabsContent>
      <TabsContent value="4">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 4</p>
        </div>
      </TabsContent>
      <TabsContent value="5">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 5</p>
        </div>
      </TabsContent>
      <TabsContent value="6">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-gray-600">Content for Tab 6</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
