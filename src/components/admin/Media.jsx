import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminMedia() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .storage
        .from('media')
        .list();

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to load media files');
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      setError(null);
      const file = event.target.files[0];
      
      if (!file) return;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPG, PNG, and GIF files are allowed');
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      
      await fetchMedia();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([fileName]);

      if (error) throw error;
      await fetchMedia();
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Failed to delete file');
    }
  };

  const getFileUrl = (fileName) => {
    return supabase.storage
      .from('media')
      .getPublicUrl(fileName)
      .data.publicUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Library</h1>
        <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
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

      {error && (
        <div className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.name} className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={getFileUrl(file.name)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(file.name)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
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