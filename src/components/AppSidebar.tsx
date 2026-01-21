import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Fingerprint, 
  CreditCard, 
  MapPin, 
  Wheat, 
  Calculator, 
  FileText, 
  LogOut,
  Menu
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { StatusBadge } from './StatusBadge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export const AppSidebar = () => {
  const { t } = useLanguage();
  const { verificationStatus, setIsLoggedIn } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const menuItems = [
    { 
      title: t('sidebar.home'), 
      url: '/dashboard', 
      icon: Home,
      status: null,
    },
    { 
      title: t('sidebar.aadhar'), 
      url: '/aadhar', 
      icon: Fingerprint,
      status: verificationStatus.aadhar,
    },
    { 
      title: t('sidebar.credit'), 
      url: '/credit', 
      icon: CreditCard,
      status: verificationStatus.credit,
    },
    { 
      title: t('sidebar.land'), 
      url: '/land', 
      icon: MapPin,
      status: verificationStatus.land,
    },
    { 
      title: t('sidebar.crop'), 
      url: '/crop', 
      icon: Wheat,
      status: verificationStatus.crop,
    },
    { 
      title: t('sidebar.calculate'), 
      url: '/calculate', 
      icon: Calculator,
      status: verificationStatus.loan,
    },
    { 
      title: t('sidebar.apply'), 
      url: '/apply', 
      icon: FileText,
      status: null,
    },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Wheat className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm">Agri Loan</span>
          </div>
        )}
        <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent rounded-lg p-2">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive(item.url) 
                        ? 'bg-sidebar-accent text-sidebar-primary' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        {item.status && <StatusBadge status={item.status} />}
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <div className="mt-auto p-2 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">{t('sidebar.logout')}</span>}
        </button>
      </div>
    </Sidebar>
  );
};
