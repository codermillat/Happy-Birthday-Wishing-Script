import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import OccasionModal from '../components/OccasionModal';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  useEffect(() => {
    checkSession();
    if (isAuthenticated) {
      fetchOccasions();
    }
  }, [isAuthenticated]);

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setLoading(false);
  }

  async function fetchOccasions() {
    try {
      const { data, error } = await supabase
        .from('occasions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOccasions(data);
    } catch (error) {
      console.error('Error fetching occasions:', error);
      setError(error.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleEditOccasion = (occasion) => {
    setSelectedOccasion(occasion);
    setIsModalOpen(true);
  };

  const handleSaveOccasion = async (formData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('occasions')
        .update({
          name: formData.name,
          slug: formData.slug,
          template: formData.template,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedOccasion.id);

      if (error) throw error;
      
      await fetchOccasions();
      setIsModalOpen(false);
      setSelectedOccasion(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOccasion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this occasion?')) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('occasions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchOccasions();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Admin Login
            </h2>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-200 p-4 rounded-md">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Occasions
                </h2>
                <button
                  onClick={() => {
                    setSelectedOccasion(null);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Occasion
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {occasions.map((occasion) => (
                  <div
                    key={occasion.id}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {occasion.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Slug: {occasion.slug}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditOccasion(occasion)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOccasion(occasion.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OccasionModal
        occasion={selectedOccasion}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOccasion(null);
        }}
        onSave={handleSaveOccasion}
      />
    </div>
  );
}

export default Admin;