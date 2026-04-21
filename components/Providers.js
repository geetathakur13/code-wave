'use client';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import SearchModal from '@/components/SearchModal';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </div>
          <ChatBot />
          <SearchModal />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
