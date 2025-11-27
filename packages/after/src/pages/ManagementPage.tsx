import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { PostManagement } from '@/pages/PostManagement';
import { UserManagement } from '@/pages/UserManagement';

export const ManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl p-5">
        <div className="mb-5">
          <h1 className="mb-1 text-2xl font-bold text-gray-800 dark:text-neutral-100">
            관리 시스템
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div className="border border-gray-300 bg-white p-2.5 dark:border-neutral-700 dark:bg-neutral-800">
          <Tabs defaultValue="post">
            <TabsList>
              <TabsTrigger value="post">게시글</TabsTrigger>
              <TabsTrigger value="user">사용자</TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <PostManagement />
            </TabsContent>

            <TabsContent value="user">
              <UserManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
