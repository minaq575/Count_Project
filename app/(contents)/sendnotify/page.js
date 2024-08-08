"use client";
import { useState, useEffect } from 'react';
import MetaRefresh from '@/app/components/meta_refresh';
import getData from '@/app/components/CLUD/get';

export default function SendNotification() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchDataAndSendNotification = async () => {
    try {
      // Fetch data
      const counterData = await getData('counter');
      const faculty = await getData('faculty'); // Fetch faculty data
  
      // Initialize variables
      let current = 0;
      let morning = 0;
      let afternoon = 0;
      let totalSum = 0;
      let facultyData = [];
  
      if (counterData.count && counterData.count.length > 0) {
        current = counterData.count[0].current;
        morning = counterData.morning || 0;
        afternoon = counterData.afternoon || 0;
        totalSum = counterData.total[0].totalSum || 0;
      }
  
      if (faculty && faculty.faculty) {
        facultyData = faculty.faculty.map((f, index) => {
          const previousTotal = faculty.faculty.slice(0, index).reduce((acc, f) => acc + f.total, 0);
          const isPreviousComplete = current >= previousTotal;
          const received = isPreviousComplete ? Math.min(f.total, current - previousTotal) : 0;
          const remaining = f.total - received;
          const percentage = f.total > 0 ? Math.round((received / f.total) * 100) : 0;
  
          return {
            ...f,
            received,
            remaining,
            percentage
          };
        });
      }
  
      // Calculate remaining morning and afternoon
      const remainingMorning = Math.max(morning - current, 0);
      const remainingAfternoon = Math.max(afternoon - (current - morning), 0);
  
      // Calculate percentages
      const overviewPercentage = totalSum > 0 ? Math.round((current / totalSum) * 100) : 100;
      const morningPercentage = morning > 0 ? (current >= morning ? 100 : Math.round((current / morning) * 100)) : 100;
      const afternoonReceived = current >= morning ? Math.max(current - morning, 0) : 0;
      const afternoonPercentage = afternoon > 0 ? (afternoonReceived >= afternoon ? 100 : Math.round((afternoonReceived / afternoon) * 100)) : 0;
  
      // Send notification
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Counter RMUTI',
          reportData: {
            current,
            totalSum,
            overviewPercentage,
            morning,
            remainingMorning,
            morningPercentage,
            afternoon,
            remainingAfternoon,
            afternoonPercentage,
            facultyData
          }
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setResponse(result.message);
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
    fetchDataAndSendNotification();

    // Set up an interval to refresh the page every 3 minutes
    const interval = setInterval(() => {
      fetchDataAndSendNotification(); // Send notification before refresh
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