'use client';

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <AdminHeader onMenuToggle={handleMenuToggle} />

      {/* Layout container */}
      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        {/* Main content */}
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
