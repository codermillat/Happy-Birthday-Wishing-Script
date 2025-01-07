import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminMedia() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      
      const { data, error } = await supabase.storage
        .from('media')
        .upload(`${Date.now()}-${file.name}`, file);

      if (error) throw error;
      
      // Add the new file to the list
      setFiles(prev => [...prev, data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Library</h1>
        <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
            accept="image/*"
          />
          {uploading ? 'Uploading...' : 'Upload Media'}
        </label>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {/* Media preview would go here */}
            </div>
          ))}
          {files.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
              No media files uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}