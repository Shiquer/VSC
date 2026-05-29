import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Settings,
  FileText,
  Calendar,
  Users,
  Image,
  BarChart3,
  LogOut,
  Home,
  BookOpen,
  MessageSquare,
  Star,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';

const adminItems = [
  { title: 'Contenu du site', url: '/admin/content', icon: FileText },
  { title: 'Reservations', url: '/admin/bookings', icon: Calendar },
  { title: 'Mediatheque', url: '/admin/media', icon: Image },
  { title: 'Articles', url: '/admin/articles', icon: BookOpen },
  { title: 'Statistiques', url: '/admin/statistics', icon: BarChart3 },
  { title: 'Messages', url: '/admin/messages', icon: MessageSquare },
  { title: 'Temoignages', url: '/admin/testimonials', icon: Star },
  { title: 'Parametres', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut } = useAdminAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = adminItems.some((i) => isActive(i.url));
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-muted font-medium text-foreground' : 'text-foreground';

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <span className="text-sm font-semibold text-foreground">Administration du site</span>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className={getNavCls}>
                    <Home className="w-4 h-4" />
                    <span>Retour au site</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>Deconnexion</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
