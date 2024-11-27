import React from 'react';
import { Home, Users, Bookmark, Calendar, Settings, MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="hidden md:block w-64 fixed h-screen bg-white border-r border-gray-200 pt-20 px-4">
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}