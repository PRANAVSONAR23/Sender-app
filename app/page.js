'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [notification, setNotification] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [dashboardApiUrl, setDashboardApiUrl] = useState(process.env.NEXT_PUBLIC_DASHBOARD_API_URL);

  const handleUrlChange = (e) => {
    setCustomUrl(e.target.value);
  };

  const handleNotificationChange = (e) => {
    setNotification(e.target.value);
  };

  const sendNotification = async () => {
    const url = customUrl || dashboardApiUrl;

    if (!url) {
      alert('No URL provided');
      return;
    }

    try {
      await axios.post(url, {
        message: notification,
        timestamp: new Date().toISOString(),
      });
      alert('Notification sent successfully!');
      setNotification('');  // Clear the input field
      setCustomUrl('');      // Clear the URL input field
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <div>By Pranav</div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sender App</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={customUrl}
            onChange={handleUrlChange}
            placeholder="Enter custom URL (optional)"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
          />
          <input 
            type="text"
            value={notification}
            onChange={handleNotificationChange}
            placeholder="Enter notification message"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        
        <button
          onClick={sendNotification}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
}
