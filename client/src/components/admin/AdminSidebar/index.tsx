'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  Users,
  FolderOpen,
  Settings,
  BarChart3,
  MessageSquare,
  Eye,
  Plus,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isOpen = true, onClose }: AdminSidebarProps) => {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'Overview',
      items: [
        {
          href: '/admin',
          label: 'Dashboard',
          icon: Home,
          badge: null,
        },
        {
          href: '/admin/analytics',
          label: 'Analytics',
          icon: BarChart3,
          badge: null,
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          href: '/admin/articles',
          label: 'Articles',
          icon: FileText,
          badge: '12',
        },
        {
          href: '/admin/articles/create',
          label: 'New Article',
          icon: Plus,
          badge: null,
        },
        {
          href: '/admin/categories',
          label: 'Categories',
          icon: FolderOpen,
          badge: '5',
        },
        {
          href: '/admin/comments',
          label: 'Comments',
          icon: MessageSquare,
          badge: '3',
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          href: '/admin/users',
          label: 'Users',
          icon: Users,
          badge: '24',
        },
        {
          href: '/admin/views',
          label: 'Page Views',
          icon: Eye,
          badge: null,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          href: '/admin/settings',
          label: 'Settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-full px-3 py-4">
          <div className="space-y-6">
            {navigationItems.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link key={item.href} href={item.href} onClick={onClose}>
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={cn(
                            'w-full justify-start gap-3 px-3',
                            isActive && 'bg-secondary'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default AdminSidebar;
