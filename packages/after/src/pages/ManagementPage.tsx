import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { PostManagement } from './PostManagement';
import { UserManagement } from './UserManagement';
import '@/styles/components.css';

export const ManagementPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>사용자와 게시글을 관리하세요</p>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
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
