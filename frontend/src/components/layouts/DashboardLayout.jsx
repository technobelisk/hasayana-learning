import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  FileBarChart,
  Menu,
  X,
  Bell,
  Settings,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Portfolio', href: '/', icon: LayoutDashboard },
  { name: 'Partners', href: '/partners', icon: Users },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Risk Insights', href: '/insights', icon: TrendingUp },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
];

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop - Web 5.0 Glassmorphic */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 glass-card-heavy border-r border-white/10 shadow-glass">
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-6 border-b border-white/10 backdrop-blur-xl">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient-primary">CreditVision</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive
                    ? 'glass-card-heavy glow-primary text-foreground shadow-lg'
                    : 'text-muted-foreground hover:glass-card-light hover:text-foreground hover:shadow-md'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-white/10 backdrop-blur-xl">
          <div className="glass-card-light p-3 rounded-xl hover:glass-card transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white shadow-lg">
                CF
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">CFO Dashboard</p>
                <p className="text-xs text-muted-foreground truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Web 5.0 Glassmorphic */}
        <header className="glass-card-heavy border-b border-white/10 h-16 flex items-center justify-between px-6 lg:px-8 backdrop-blur-xl shadow-glass">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:glass-card-light"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search partners, invoices, insights..."
                className="pl-10 glass-card-light border-white/10 focus:glass-card transition-all duration-300"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover-glow-primary">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 glass-card border-white/10">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="flex items-center gap-2 w-full">
                    <Badge variant="destructive" className="text-xs">High Risk</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
                  </div>
                  <p className="text-sm mt-1">Partner XYZ exceeded credit limit</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="flex items-center gap-2 w-full">
                    <Badge className="text-xs bg-warning text-black">Warning</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
                  </div>
                  <p className="text-sm mt-1">3 invoices overdue by 30+ days</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="hover-glow-primary">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-br from-background via-background to-background-elevated">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 glass-card-heavy border-r border-white/10 shadow-glass backdrop-blur-xl">
            {/* Logo */}
            <div className="flex items-center gap-3 h-16 px-6 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">CreditVision</span>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                      isActive
                        ? 'glass-card-heavy glow-primary text-foreground shadow-lg'
                        : 'text-muted-foreground hover:glass-card-light hover:text-foreground hover:shadow-md'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};
