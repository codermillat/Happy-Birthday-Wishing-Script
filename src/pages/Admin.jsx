import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../components/admin/Dashboard';
import AdminTemplates from '../components/admin/Templates';
import AdminMedia from '../components/admin/Media';
import AdminUsers from '../components/admin/Users';
import AdminSettings from '../components/admin/Settings';
import AdminLogin from '../components/admin/Login';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      navigate('/admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      navigate('/setup');
      return;
    }

    let logoutTimer;
    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      if (isAuthenticated) {
        logoutTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    if (isAuthenticated) {
      // Set up event listeners
      events.forEach(event => {
        document.addEventListener(event, resetTimer);
      });
      // Initial timer setup
      resetTimer();
    }

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthed = !!session;
      setIsAuthenticated(isAuthed);
      setLoading(false);
      
      if (isAuthed) {
        resetTimer();
      }
    });

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
      if (logoutTimer) clearTimeout(logoutTimer);
      subscription.unsubscribe();
    };
  }, [navigate, handleLogout, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="templates" element={<AdminTemplates />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default Admin;