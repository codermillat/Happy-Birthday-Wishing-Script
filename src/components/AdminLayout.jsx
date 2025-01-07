import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Templates', href: '/admin/templates', icon: '📝' },
    { name: 'Media', href: '/admin/media', icon: '🖼️' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile sidebar backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle theme"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
                >
                  <span className="mr-2">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <div className="sticky top-0 z-40">
            <div className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                ☰
              </button>
            </div>
          </div>

          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}