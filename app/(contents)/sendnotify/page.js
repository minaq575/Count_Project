"use client";
import { useState, useEffect } from 'react';
import MetaRefresh from '@/app/components/meta_refresh';

export default function SendNotification() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Function to send notification
  const sendNotification = async () => {
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Page refreshed' }),
      });
      const result = await res.json();
      if (res.ok) {
        setResponse(result.success);
        setError(null);
      } else {
        setResponse(null);
        setError(result.error);
      }
    } catch (err) {
      setResponse(null);
      setError('Failed to send notification');
    }
  };

  useEffect(() => {
    // Send notification on component mount
    sendNotification();

    // Set up an interval to refresh the page every 3 minutes
    const interval = setInterval(() => {
      sendNotification(); // Send notification before refresh
      window.location.reload();
    }, 180000); // 180,000 ms = 3 minutes

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <MetaRefresh interval="180" /> {/* Optionally include MetaRefresh for extra compatibility */}
      <h1>Send Notification</h1>
      {/* Display success or error message if available */}
      {response && <p>Notification sent successfully!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
