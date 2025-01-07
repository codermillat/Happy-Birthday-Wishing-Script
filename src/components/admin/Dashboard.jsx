import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
    { name: 'Total Templates', value: '12' },
    { name: 'Active Templates', value: '8' },
    { name: 'Total Users', value: '156' },
    { name: 'Recent Activities', value: '24' },
  ];

  const handleCreateTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .insert([
          {
            name: 'New Template',
            occasion_slug: 'birthday',
            content: {
              message: 'Happy Birthday! Wishing you a fantastic day filled with joy and happiness!'
            }
          }
        ]);

      if (error) throw error;
      navigate('/admin/templates');
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleUploadMedia = () => {
    navigate('/admin/media');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <button 
              onClick={handleCreateTemplate}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create New Template
            </button>
            <button 
              onClick={handleUploadMedia}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}