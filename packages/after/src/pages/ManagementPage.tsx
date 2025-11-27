import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { PostManagement } from '@/pages/PostManagement';
import { UserManagement } from '@/pages/UserManagement';

export const ManagementPage = () => {
  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-7xl p-5">
        <div className="mb-5">
          <h1 className="mb-1 text-2xl font-bold text-foreground">관리 시스템</h1>
          <p className="text-sm text-muted-foreground">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="border border-border bg-card p-2.5">
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
