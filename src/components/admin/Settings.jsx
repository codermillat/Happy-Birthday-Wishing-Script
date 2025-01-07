import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Multi-Occasion Wishing App',
    defaultLanguage: 'en',
    enableNotifications: true,
    enableDarkMode: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Save settings logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated save
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Language
            </label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableNotifications"
              checked={settings.enableNotifications}
              onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enableNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Enable Notifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableDarkMode"
              checked={settings.enableDarkMode}
              onChange={(e) => setSettings({ ...settings, enableDarkMode: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Enable Dark Mode by Default
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}