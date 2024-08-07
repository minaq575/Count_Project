"use client";
import { useState } from 'react';

export default function SendNotification() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSendNotification = async () => {
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
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

  return (
    <div>
  
    </div>
  );
}
