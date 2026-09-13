# Deployment Configuration

## Separate frontend and backend deployments

The frontend reads `VITE_API_BASE_URL` **at build time**. Set it in the frontend hosting provider before building, using the public FastAPI origin without a trailing slash.

```env
VITE_API_BASE_URL=https://your-backend-domain.example.com
```

The backend must allow the exact frontend origin through `CORS_ORIGINS`:

```env
CORS_ORIGINS=https://your-frontend-domain.example.com
GEMINI_API_KEY=your-key
```

If more than one browser origin is needed, separate them with commas:

```env
CORS_ORIGINS=https://your-frontend-domain.example.com,https://staging-frontend.example.com
```

After changing `VITE_API_BASE_URL`, trigger a **new frontend build and deployment**. Changing the variable after the frontend has already been built does not alter the JavaScript bundle.

## Local development

Run FastAPI on port 8001 and the Vite frontend on port 5173. The Vite proxy forwards `/api` requests to `http://127.0.0.1:8001` by default.

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8001

cd frontend
npm install
npm run dev
```

For a different local backend port, create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://127.0.0.1:9000
```

## Quick verification

Open the backend URL directly first:

```text
https://your-backend-domain.example.com/health
https://your-backend-domain.example.com/api/catalog
```

Then open the deployed frontend and check the browser Network panel. Requests should go to the configured backend origin, not to the frontend origin's `/api` path.

## Important distinction

`VITE_API_BASE_URL` belongs to the **frontend hosting environment**. `GEMINI_API_KEY` and `CORS_ORIGINS` belong to the **backend hosting environment**. Do not place `GEMINI_API_KEY` in the frontend environment or frontend source code.
