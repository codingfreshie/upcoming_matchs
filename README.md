
# Upcoming Matchs

A full-stack application to fetch and display upcoming sports matches, built with React (frontend) and Express (backend).

## Overview

**Upcoming Matchs** provides sports enthusiasts with a seamless experience to check upcoming match fixtures. The frontend is built in React for a smooth UI, while the backend uses Express to serve APIs fetching match data.

---

## Features

- React-based interactive frontend
- Express.js backend serving match data APIs
- Displays match details: teams, date, time, venue
- Easy to run locally or deploy

---

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm or yarn package manager

---

### Installation

1. Clone the repo:

```bash
git clone https://github.com/codingfreshie/upcoming_matchs.git
cd upcoming_matchs
```

2. Install backend dependencies:

```bash
cd backend
npm install
npm install dotenv

```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install

```

---

### Running Locally

1. Start the backend server:

```bash
cd backend
node server.js
```

Backend runs on [http://localhost:5000](http://localhost:5000) by default.

2. In a new terminal, start the frontend:

```bash
cd frontend
npm run build
npm run dev
```

Frontend runs on [http://localhost:5173/api/matches](http://localhost:5137) by default.

Open [http://localhost:5173/api/matches](http://localhost:5173/api/matches) in your browser to view the app.

---

## Configuration

If your backend requires API keys or environment variables, create a `.env` file in the `backend` directory with relevant entries, for example:

```
RAPIDAPI_KEY=your_api_key_here

```

Make sure the backend code reads from `process.env`.

---

## Project Structure

```
upcoming_matchs/
├── backend/       # Express server code
├── frontend/      # React app source code
├── README.md      # This file
```

---

## Contributing

Feel free to open issues or pull requests to improve the app.

---

## License

MIT License © 2025 CodingFreshie

---
