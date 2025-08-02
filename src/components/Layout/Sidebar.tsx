import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  Plus,
  Users,
  Settings,
  FolderOpen,
  UserCheck,
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'agent', 'user'],
  },
  {
    name: 'My Tickets',
    href: '/tickets',
    icon: Ticket,
    roles: ['admin', 'agent', 'user'],
  },
  {
    name: 'Create Ticket',
    href: '/create-ticket',
    icon: Plus,
    roles: ['admin', 'agent', 'user'],
  },
  {
    name: 'All Tickets',
    href: '/all-tickets',
    icon: FolderOpen,
    roles: ['admin', 'agent'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: Settings,
    roles: ['admin'],
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: UserCheck,
    roles: ['admin'],
  },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item =>
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-50 border-r border-gray-200">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-blue-100 border-blue-500 text-blue-700 border-r-2'
                      : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`}
                >
                  <Icon
                    className={`${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;