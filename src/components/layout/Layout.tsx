import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Trophy, Users, BookOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { path: '/', name: '首页', icon: Home },
  { path: '/courses', name: '学习', icon: Map },
  { path: '/practice', name: '练习', icon: BookOpen },
  { path: '/profile', name: '成就', icon: Trophy },
  { path: '/community', name: '社区', icon: Users },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-black text-violet-600 flex items-center gap-2">
          <span className="text-3xl">🌍</span> Polyglot
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all duration-200",
                isActive 
                  ? "bg-violet-100 text-violet-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive ? "text-violet-600" : "text-gray-400")} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-violet-600" : "text-gray-400"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-violet-100")} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLearnPage = location.pathname.startsWith('/learn');

  // If it's the immersive learning page, don't show navigation
  if (isLearnPage) {
    return <main className="w-full min-h-screen bg-background">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:ml-64 pb-16 md:pb-0 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}