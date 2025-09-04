'use client';
import { useEffect, useState } from 'react';

const messages = [
  'Booking the venue… 🏟️',
  'Mic check 1, 2… 🎙️',
  'Inflating balloons… 🎈',
  'Printing name badges… 🪪',
  'Brewing coffee for the meetup… ☕',
  'Syncing schedules… 📅',
  'Arranging chairs in a perfect grid… 🪑',
];

export default function LoadingEventsRaw({ count = 6 }: { count?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % messages.length), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-wrap" role="status" aria-live="polite">
      <div className="loader">
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
        <p className="small">{messages[idx]}</p>
      </div>
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card">
            <div className="skel bar"></div>
            <div className="skel small"></div>
            <div className="skel block"></div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <div className="skel btn"></div>
              <div className="skel btn" style={{ width: '120px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
