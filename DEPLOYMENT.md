# Deployment Guide: SQL Dashboard

## Overview
This guide walks you through deploying the SQL Dashboard application with:
- **Backend** → Render
- **Frontend** → Vercel
- **Database** → Aiven MySQL (already configured)

---

## Prerequisites

✅ GitHub account with this repository pushed  
✅ Render account (sign up at https://render.com)  
✅ Vercel account (sign up at https://vercel.com)  
✅ Aiven MySQL database credentials  
✅ SSL certificate file (`aiven-ca.crt`) committed to backend folder  

---

## Part 1: Deploy Backend to Render

### Step 1: Create New Web Service on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select this repository

### Step 2: Configure Build Settings

```
Name: sql-dashboard-backend (or your preferred name)
Environment: Node
Region: Choose closest to your users
Branch: main (or your default branch)
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `DB_HOST` | `your-mysql-host.aivencloud.com` | From Aiven dashboard |
| `DB_USER` | `avnadmin` | From Aiven dashboard |
| `DB_PORT` | `12345` | From Aiven dashboard |
| `DB_PASSWORD` | `your-password` | From Aiven dashboard |
| `DB_NAME` | `defaultdb` | From Aiven dashboard |
| `DB_SSL_CA` | `./aiven-ca.crt` | Keep as is |
| `FRONTEND_URL` | `*` | Update after Vercel deployment |
| `PORT` | `5000` | Keep as is |
| `NODE_ENV` | `production` | Keep as is |

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (~2-5 minutes)
3. Copy your backend URL: `https://your-app.onrender.com`

> ⚠️ **Important:** Keep this URL - you'll need it for frontend deployment!

### Step 5: Test Backend

Visit: `https://your-app.onrender.com/api/data`

You should see JSON data from your database.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Click **"Import"**

### Step 2: Configure Project Settings

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 3: Add Environment Variable

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-app.onrender.com` |

> Replace with your actual Render backend URL from Part 1, Step 4

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (~1-3 minutes)
3. Copy your Vercel URL: `https://your-app.vercel.app`

### Step 5: Visit Your Application

Open your Vercel URL in a browser. Your dashboard should load with data!

---

## Part 3: Update Backend CORS

Now that you have your Vercel URL, update the backend to accept requests from your frontend domain.

### Step 1: Update Render Environment Variable

1. Go to Render dashboard
2. Select your backend service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update value to: `https://your-app.vercel.app`
6. Click **"Save Changes"**

### Step 2: Trigger Redeploy

Render will automatically redeploy with the new CORS settings.

---

## Verification Checklist

✅ Backend URL accessible: `https://your-backend.onrender.com/api/data`  
✅ Frontend loads without errors  
✅ Dashboard displays data from backend  
✅ Charts render correctly  
✅ No CORS errors in browser console  

---

## Troubleshooting

### Backend Issues

**Database Connection Failed:**
- Verify all Aiven credentials are correct
- Ensure `aiven-ca.crt` file is in the backend folder
- Check Render logs: Dashboard → Service → Logs

**CORS Errors:**
- Ensure `FRONTEND_URL` matches your Vercel URL exactly (no trailing slash)
- Redeploy backend after changing environment variables

### Frontend Issues

**"Cannot connect to backend":**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend URL is accessible
- Redeploy frontend after changing environment variables

**Blank page after deployment:**
- Check Vercel deployment logs for build errors
- Verify `vercel.json` configuration is correct
- Check browser console for JavaScript errors

### Database Issues

**SSL Certificate Error:**
- Ensure `aiven-ca.crt` is committed to Git
- Verify `DB_SSL_CA` environment variable is `./aiven-ca.crt`
- Check file exists in deployed backend (check Render Shell)

---

## Environment Variables Quick Reference

### Backend (Render)
```env
DB_HOST=your-host.aivencloud.com
DB_USER=avnadmin
DB_PORT=12345
DB_PASSWORD=your-password
DB_NAME=defaultdb
DB_SSL_CA=./aiven-ca.crt
FRONTEND_URL=https://your-app.vercel.app
PORT=5000
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Post-Deployment

### Custom Domains (Optional)

**Render:**
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

**Vercel:**
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Monitoring

**Render:**
- View logs: Dashboard → Service → Logs
- Monitor metrics: Dashboard → Service → Metrics

**Vercel:**
- View deployments: Dashboard → Project → Deployments
- Check analytics: Dashboard → Project → Analytics

---

## Redeployment

### Backend Changes:
```bash
git add .
git commit -m "Update backend"
git push
```
Render will auto-deploy on push to main branch.

### Frontend Changes:
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel will auto-deploy on push to main branch.

---

## Support

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Aiven Docs: https://docs.aiven.io

---

## Security Notes

🔒 **Never commit sensitive data:**
- `.env` files are in `.gitignore`
- Use environment variables for all secrets
- Rotate passwords if accidentally committed

🔒 **CORS Configuration:**
- Production backend restricts to Vercel domain only
- Update `FRONTEND_URL` if you change domains

🔒 **Database Security:**
- SSL/TLS encryption enabled via `aiven-ca.crt`
- Database credentials stored as environment variables only

---

**Deployment Complete! 🎉**

Your SQL Dashboard is now live and accessible worldwide!
