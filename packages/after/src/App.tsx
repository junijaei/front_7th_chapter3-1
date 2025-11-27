import React from 'react';
import { ThemeProvider } from '@/hooks';
import { Header } from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';
import { ManagementPage } from '@/pages/ManagementPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
        <Header>
          <Header.Logo
            logo={{
              text: 'L',
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
        <main>
          <ManagementPage />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};
