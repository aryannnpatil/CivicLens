# SIH25031 — Crowdsourced Civic Issue Reporting & Resolution System

A 3-service mono-repo for rapid civic issue management.

## Services

| Directory | Tech | Port |
|-----------|------|------|
| `frontend/` | React (mobile-first + admin dashboard) | 3000 |
| `backend/` | Node.js + Express API | 5000 |
| `ai-service/` | Python + Flask classification microservice | 5001 |

## Quick Start

```bash
# Backend
cd backend && cp .env.example .env   # fill in values
npm install && npm run dev

# AI Service
cd ai-service
python -m venv venv && venv\Scripts\activate
pip install -r requirements.txt && python app.py

# Frontend
cd frontend && npm install && npm start
```

## Cloud
- **Storage:** Azure Blob Storage (`civic-issue-uploads` container)
- **CDN:** Azure CDN fronting the blob container
- **Hosting:** Azure App Service (one per service)
- **Database:** MongoDB Atlas (M0 free tier for dev)
