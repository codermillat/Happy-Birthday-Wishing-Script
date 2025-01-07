import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function CustomizeWish() {
  const { occasion } = useParams();
  const [template, setTemplate] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplate();
  }, [occasion]);

  async function fetchTemplate() {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('occasion_id', occasion)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (error) {
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleShare = async (platform) => {
    const message = `Dear ${recipientName},\n${customMessage}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`);
        break;
      case 'messenger':
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=YOUR_APP_ID`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 transition-colors dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Customize Your Wish
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient's Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <div className="preview-section p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-900 dark:text-white">Dear {recipientName || '[Name]'},</p>
              <p className="text-gray-900 dark:text-white mt-2">{customMessage || '[Your message will appear here]'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Share on WhatsApp
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Share on Telegram
            </button>
            <button
              onClick={() => handleShare('messenger')}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Share on Messenger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}