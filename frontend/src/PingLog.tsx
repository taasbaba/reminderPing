import React, { useEffect, useState } from 'react';
import socket from './socket';

interface PingMessage {
  message: string;
  triggerAt: number;
}

const PingLog: React.FC<{ userId: string; onPing?: () => void }> = ({ userId, onPing }) => {
  const [logs, setLogs] = useState<PingMessage[]>([]);

  useEffect(() => {
    const eventName = `ping:${userId}`;

    const handler = (msg: PingMessage) => {
      setLogs((prev) => [...prev, msg]);
      if (onPing) onPing(); // 🔔 Notify App.tsx to start ringing
    };

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [userId, onPing]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="d-flex flex-column gap-3">
        {logs.map((log, index) => (
          <div key={index} className="alert alert-warning shadow-sm" role="alert">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                ⏰ <strong>{new Date(log.triggerAt).toLocaleTimeString()}</strong>
              </span>
              <span className="fw-bold text-dark">{log.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default PingLog;
