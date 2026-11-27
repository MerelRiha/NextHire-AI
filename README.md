# NextHire AI — MCA Project

A complete MERN job-readiness platform that runs in **Demo Mode without any AI API key**.

## Stack
- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Axios
- Recharts

## Features
Authentication, dashboard, ATS resume analysis, role-aware quiz, coding practice with safe demo execution, mock interviews with local MockAI scoring, progress, history, profile, and seeded demo data.

## Demo account
- Email: `demo@nexthire.ai`
- Password: `Demo@123`

## Requirements
- Node.js 18+
- MongoDB 6+ (local or MongoDB Atlas)

## Run

```bash
# 1. Server
cd server
cp .env.example .env
npm install
npm run seed
npm run dev

# 2. Client (new terminal)
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

The server defaults to `http://localhost:5000`.

## Environment
Server `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexthire_ai
JWT_SECRET=change_this_in_production
CLIENT_URL=http://localhost:5173
DEMO_MODE=true
```

Client uses Vite proxy, so no client environment variable is required for local development.

## Demo-mode notes
- ATS scoring is a deterministic keyword/skill matching algorithm.
- Quiz questions come from a local JSON question bank and are personalized by role/topics.
- Mock interview evaluation uses local scoring heuristics for relevance, clarity, structure, and technical keywords.
- Coding `Run`/`Submit` uses a safe demo evaluator. It does **not** execute arbitrary user code on the server.

## Project structure
```text
client/      React/Vite frontend
server/      Express/Mongoose backend
documentation/ architecture + API notes
BUILD_STATUS.md stage tracking
```

## Production notes
Set a strong `JWT_SECRET`, a real MongoDB URI, restrict CORS, serve the built client from a CDN/web server, and replace the demo coding evaluator with a sandboxed execution service if required.
