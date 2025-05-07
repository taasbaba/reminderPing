# ReminderPing ⏰

A simple SaaS-style reminder system that lets users schedule pings via log, WebSocket — built with React and Node.js.

## Demo

> Live Frontend: https://your-vercel-url.vercel.app  
> Live API (Render): https://your-backend-url.onrender.com

## Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | React + Vite (hosted on Vercel) |
| Backend    | Node.js + NestJS (hosted on Render) |
| Protocol   | REST API + WebSocket         |

---

## Features

- Schedule pings with a custom message and time
- WebSocket client auto-receives incoming reminders
- Clean, minimal UI with instant feedback

---

## Folder Structure

```
reminderping-demo/
├── backend/   # Node.js/NestJS backend API
├── frontend/  # React app (Vite)
└── README.md
```

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/taasbaba/reminderPing.git
cd reminderping-demo
```

---

### 2. Backend Setup

```bash
cd backend
cp .env.example .env # ← create your env file
npm install
npm run start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
cp .env.example .env # ← create your env file
npm install
npm run dev
```

**Sample `.env` file:**
```
REACT_APP_API_URL=http://localhost:3000
```

---

## Deployment

- **Frontend**: [Vercel](https://vercel.com) — set `REACT_APP_API_URL` to your Render backend URL
- **Backend**: [Render](https://render.com) — point to `/backend`

---

## Author

**Yuanyu Lin**  
Backend engineer focused on scalable real-time systems for games and SaaS tools.

---

## License

MIT