import React, { useState, useEffect } from 'react';

export default function OccasionModal({ occasion, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    template: {
      default_message: '',
      styles: {},
      settings: {}
    }
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (occasion) {
      setFormData({
        name: occasion.name,
        slug: occasion.slug,
        template: occasion.template || {
          default_message: '',
          styles: {},
          settings: {}
        }
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        template: {
          default_message: '',
          styles: {},
          settings: {}
        }
      });
    }
  }, [occasion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.slug.trim()) {
      setError('Name and slug are required');
      return;
    }

    // Validate slug format (lowercase, no spaces, only hyphens)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug)) {
      setError('Slug must be lowercase, no spaces, use hyphens for separation');
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {occasion ? 'Edit Template' : 'New Template'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Birthday Wishes"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., birthday-wishes"
                required
                disabled={!!occasion}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                URL-friendly name (lowercase, no spaces)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Message
              </label>
              <textarea
                value={formData.template.default_message}
                onChange={(e) => setFormData({
                  ...formData,
                  template: {
                    ...formData.template,
                    default_message: e.target.value
                  }
                })}
                rows="4"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter default message template..."
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}