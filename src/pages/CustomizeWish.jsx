import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function CustomizeWish() {
  const { occasion } = useParams();
  const [template, setTemplate] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchTemplate();
    } else {
      setLoading(false);
      setError('Please set up your Supabase environment variables in the .env file.');
    }
  }, [occasion]);

  async function fetchTemplate() {
    try {
      const { data: occasionData, error: occasionError } = await supabase
        .from('occasions')
        .select('*')
        .eq('slug', occasion)
        .single();

      if (occasionError) throw occasionError;
      
      const { data: templateData, error: templateError } = await supabase
        .from('templates')
        .select('*')
        .eq('occasion_slug', occasion)
        .single();

      if (templateError && templateError.code !== 'PGRST116') throw templateError;

      setTemplate({
        ...occasionData,
        defaultMessage: templateData?.content?.message || occasionData.template.default_message
      });
      setCustomMessage(templateData?.content?.message || occasionData.template.default_message);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load template');
    } finally {
      setLoading(false);
    }
  }

  const handleShare = (platform) => {
    const message = `Dear ${recipientName},\n${customMessage}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-red-600 mb-4">{error}</div>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {template?.name}
          </h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            ← Back
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient's Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <div className="preview-section p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <p className="text-gray-900">Dear {recipientName || '[Name]'},</p>
              <p className="text-gray-900 mt-2">{customMessage || '[Your message will appear here]'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Share on WhatsApp
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Share on Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}