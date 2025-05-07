import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PingLog from './PingLog';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [form, setForm] = useState({
    userId: '',
    message: '',
    triggerAt: '',
  });

  const [response, setResponse] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  // Generate a UUID for this user session on mount
  useEffect(() => {
    setForm((prev) => ({ ...prev, userId: uuidv4() }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReminder();
  };

  const submitReminder = async () => {
    if (!form.message || !form.triggerAt) {
      setResponse('⚠️ Please fill in all the required fields!');
      return;
    }

    const triggerAtMs = new Date(form.triggerAt).getTime();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/reminders`, {
        ...form,
        triggerAt: triggerAtMs,
        type: 'websocket',
      });
      setResponse(`✅ Scheduled: ${res.data.id}`);
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    } catch (err) {
      setResponse(`❌ Failed to schedule reminder.`);
    }
  };

  // ✅ Called when PingLog receives real-time ping
  const handlePing = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 10000); // ring for 10 seconds
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-3">ReminderPing Demo</h1>
        <motion.img
          src="/clock.png"
          alt="Clock"
          className={`img-fluid rounded-circle shadow ${isRinging ? 'combo-animation' : ''}`}
          style={{ width: 300, height: 300, objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => {
            console.log('[Clock Clicked]');
            submitReminder();
          }}
          animate={isClicked ? { scale: [1, 1.1, 0.95, 1] } : {}}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <form onSubmit={handleSubmit}>
          {/* Message */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-semibold">
              💬 What should the alarm remind you about?
            </label>
            <input
              className="form-control"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your awesome reminder message here..."
              required
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="triggerAt" className="form-label fw-semibold">
              📅 When should I ring the bell?
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="triggerAt"
              value={form.triggerAt}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100 fw-bold">
            🚀 Launch My Reminder!
          </button>
        </form>
      </div>

      {response && <div className="alert alert-info">{response}</div>}

      {form.userId && (
        <div className="card p-3">
          <h5 className="mb-3">📥 Incoming Pings</h5>
          <PingLog userId={form.userId} onPing={handlePing} />
        </div>
      )}

      {/* Glow Animation */}
      <style>{`
  .combo-animation {
    animation: glow 0.6s ease-in-out infinite alternate, shake 0.4s ease-in-out infinite;
  }

  @keyframes glow {
    from {
      filter: drop-shadow(0 0 0px #ffc107);
    }
    to {
      filter: drop-shadow(0 0 20px #ffc107);
    }
  }

  @keyframes shake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    50% { transform: rotate(-3deg); }
    75% { transform: rotate(3deg); }
    100% { transform: rotate(0deg); }
  }
`}</style>

    </div>
  );
};

export default App;
