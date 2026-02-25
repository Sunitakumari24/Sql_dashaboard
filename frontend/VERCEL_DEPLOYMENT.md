# Frontend Vercel Configuration

## Environment Variables to Set in Vercel Dashboard:

### Production Environment Variable:
```
VITE_API_URL=https://your-backend-app.onrender.com
```

Replace `your-backend-app.onrender.com` with your actual Render backend URL after deployment.

## Build Settings:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Root Directory:** `frontend` (if deploying from monorepo)

## Deployment Steps:
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Add the environment variable `VITE_API_URL`
4. Deploy
5. Copy the Vercel URL and update the `FRONTEND_URL` in Render backend
