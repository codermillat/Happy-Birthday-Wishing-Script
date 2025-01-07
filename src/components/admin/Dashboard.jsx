import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OccasionModal from '../OccasionModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = [
    { name: 'Total Templates', value: '12' },
    { name: 'Active Templates', value: '8' },
    { name: 'Total Users', value: '156' },
    { name: 'Recent Activities', value: '24' },
  ];

  const handleCreateTemplate = () => {
    setIsModalOpen(true);
  };

  const handleUploadMedia = () => {
    navigate('/admin/media');
  };

  const handleSaveTemplate = async (formData) => {
    try {
      // Template creation logic will be handled by the OccasionModal
      setIsModalOpen(false);
      // Refresh the dashboard or show success message
    } catch (error) {
      console.error('Error creating template:', error);
    }
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
            {/* Activity items would go here */}
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
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Create New Template
            </button>
            <button 
              onClick={handleUploadMedia}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Upload Media
            </button>
          </div>
        </div>
      </div>

      {/* Template Creation Modal */}
      <OccasionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}