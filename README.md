# Developer Portfolio

A scalable, modern, and production-ready developer portfolio built with a React/Vite frontend and a Python/Flask backend.

## Architecture
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Zustand
- **Backend**: Python, Flask, Flask-SQLAlchemy (SQLite default), Flask-JWT-Extended
- **Storage**: Local file uploads (extendable to S3)

## Quick Start

### 1. Backend Setup
Ensure you have Python 3.9+ installed.
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Initialize database and default admin user
python init_admin.py

# Run development server (runs on port 5000)
python app.py
```

### 2. Frontend Setup
Ensure you have Node.js 18+ installed.
```bash
cd frontend
npm install

# Run development server (runs on port 5173 by default)
npm run dev
```

## Default Admin Credentials
- **Username**: admin
- **Password**: admin123

Access the admin panel at `/admin` to start modifying your portfolio contents dynamically.

## Deployment Guide

### Backend (Render / Railway)
1. Push the `backend/` code to a GitHub repository.
2. In Render, create a new "Web Service" connected to the repo.
3. Set the Root Directory to `backend/`.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `gunicorn app:app` (You may need to add gunicorn to requirements: `pip install gunicorn`)
6. Add Environment Variables: `SECRET_KEY`, `JWT_SECRET_KEY`, `DATABASE_URL` (if migrating to PostgreSQL).

### Frontend (Vercel / Netlify)
1. Push the `frontend/` code to a GitHub repository.
2. Import the project in Vercel.
3. Set the Root Directory to `frontend/`.
4. Framework Preset: Vite.
5. Add Environment Variable: `VITE_API_URL` pointing to your deployed backend URL.
6. Deploy!
