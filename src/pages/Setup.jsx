import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

export default function Setup() {
  // ... (previous state and handlers remain the same)

  const SetupGuide = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Complete Setup Guide</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">1. Supabase Setup</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase.com</a> and sign in</li>
          <li>Click "New Project" and fill in project details</li>
          <li>Wait for database setup (about 1 minute)</li>
          <li>Go to Project Settings (gear icon) → API</li>
          <li>Copy Project URL (without https://)</li>
          <li>Copy anon/public key (under API keys)</li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">2. Database Setup</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">The required tables will be created automatically when you connect.</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">3. Admin Account</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Use a valid email address</li>
          <li>Choose a strong password (min 6 characters)</li>
          <li>Save these credentials securely</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Security Notes:</h3>
        <ul className="list-disc list-inside space-y-2 text-yellow-700 dark:text-yellow-300">
          <li>Never share your admin credentials</li>
          <li>Keep Supabase keys secure</li>
          <li>Use HTTPS in production</li>
          <li>Regularly check admin access</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">After Setup:</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>Log in to admin panel at /admin</li>
          <li>Create occasion templates</li>
          <li>Customize messages and designs</li>
          <li>Share the app with users</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Troubleshooting:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Verify credentials are copied correctly</li>
          <li>Check if Supabase project is active</li>
          <li>Clear browser cache if needed</li>
          <li>Ensure stable internet connection</li>
        </ul>
      </div>
    </div>
  );

  // ... (rest of the component remains the same)
}