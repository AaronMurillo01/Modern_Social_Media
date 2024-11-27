import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, MessageCircle, LogOut, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, Link } from 'react-router-dom';

export function Header() {
  const { notifications, messages, markNotificationAsRead } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed w-full bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">connect</h1>
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative" ref={notificationRef}>
              <button 
                className="relative text-gray-600 hover:text-gray-900 touch-target"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={notification.user.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{notification.user.name}</span>
                              {' '}
                              {notification.content}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(notification.timestamp)} ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              className="relative text-gray-600 hover:text-gray-900 touch-target"
              onClick={() => navigate('/messages')}
            >
              <MessageCircle size={20} />
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 touch-target"
              >
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <div className="px-4 py-2 text-sm text-gray-900 border-b">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} />
                    <span>Edit Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}