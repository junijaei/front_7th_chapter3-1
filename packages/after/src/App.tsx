import { ThemeProvider } from '@/hooks';
import { Header } from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';
import { ManagementPage } from '@/pages/ManagementPage';

export const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
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
