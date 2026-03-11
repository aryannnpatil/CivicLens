# 🚧 CivicLens — Crowdsourced Civic Issue Reporting & Resolution

> **HackOverflow 2026** | Theme: Urban to Global | SIH25031 — Govt. of Jharkhand

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](./client)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](./server)
[![Flask](https://img.shields.io/badge/AI-Flask-000000?logo=flask)](./ai-service)
[![Azure](https://img.shields.io/badge/Cloud-Azure-0078D4?logo=microsoftazure)](https://azure.microsoft.com)

---

## Problem

Citizens lack a structured way to report urban infrastructure hazards (potholes, garbage dumps, broken streetlights), and municipal governments waste thousands of hours manually sorting these unstructured complaints.

## Solution

A **mobile-first web app** for citizens to snap photos and drop GPS pins of issues, coupled with an **AI-powered municipal dashboard** that automatically categorizes issues and assigns severity scores using computer vision.

---

## Repo Structure

```
optimum-ho-solution/
├── client/          # React PWA — Citizen & Admin views (Member 1)
├── server/          # Node.js + Express API (Member 2)
├── ai-service/      # Python Flask AI classification microservice (Member 3)
├── docs/            # API contracts & architecture docs
├── .env.example     # Environment variable template
└── README.md
```

## Quick Start

### 1. Clone & Configure

```bash
git clone https://github.com/Hey-Viswa/optimum-ho-solution.git
cd optimum-ho-solution
cp .env.example .env   # Fill in your credentials
```

### 2. Client (React)

```bash
cd client
npm install
npm run dev          # → http://localhost:5173
```

### 3. Server (Node/Express)

```bash
cd server
npm install
npm run dev          # → http://localhost:3001
```

### 4. AI Service (Flask)

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python app.py               # → http://localhost:5000
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, TailwindCSS, Mapbox GL |
| Backend | Node.js, Express, Mongoose |
| AI Service | Python, Flask, YOLOv8 / MobileNetV2 |
| Database | MongoDB Atlas |
| Cloud | Azure Blob Storage, Azure App Service, Azure CDN |

---

## Team

| Role | Responsibility |
|------|----------------|
| **Member 1** — Frontend Lead | React citizen app, admin dashboard, map integrations |
| **Member 2** — Backend Lead | Node/Express API, MongoDB schemas, service bridge |
| **Member 3** — AI & Cloud Lead | Flask classification service, Azure deployment |

---

## License

Built for HackOverflow 2026. All rights reserved.
