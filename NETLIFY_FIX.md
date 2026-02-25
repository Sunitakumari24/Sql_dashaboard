# Netlify Deployment Instructions

## Your URLs:
- **Backend (Render):** https://sql-dashboard-backend.onrender.com
- **Frontend (Netlify):** https://lustrous-praline-762ab1.netlify.app

## Fix Steps:

### Step 1: Set Environment Variable in Netlify

1. Go to **Netlify Dashboard**: https://app.netlify.com
2. Select your site: **lustrous-praline-762ab1**
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://sql-dashboard-backend.onrender.com`
   - **Scopes:** Select "Production" and "Deploy previews"
6. Click **Save**

### Step 2: Update Backend CORS in Render

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Select your service: **sql-dashboard-backend**
3. Go to **Environment** tab
4. Find or add `FRONTEND_URL` variable
5. Set value to: `https://lustrous-praline-762ab1.netlify.app`
   - ⚠️ **NO trailing slash**
6. Click **Save Changes**
7. Backend will automatically redeploy

### Step 3: Redeploy Frontend on Netlify

After setting environment variable:

**Option A: Trigger Redeploy**
1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**

**Option B: Push to GitHub**
```bash
cd /home/khushbu/sql-dashbord
git add .
git commit -m "Configure production URLs for Netlify deployment"
git push
```

Netlify will auto-deploy on push.

### Step 4: Wait and Test

1. Wait for both deployments to complete (1-2 minutes each)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Visit: https://lustrous-praline-762ab1.netlify.app
4. Press F12 → Console tab to check for errors
5. Data should now appear!

---

## Verification:

### Test Backend (should work now):
✅ https://sql-dashboard-backend.onrender.com/api/data
✅ https://sql-dashboard-backend.onrender.com/summary
✅ https://sql-dashboard-backend.onrender.com/pass-fail

### Check Environment Variable is Set:
Open browser console on your Netlify site and run:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

Should show: `https://sql-dashboard-backend.onrender.com`

---

## Quick Summary:

**Problem:** Frontend can't connect to backend because:
1. ❌ `VITE_API_URL` not set in Netlify
2. ❌ `FRONTEND_URL` not set in Render (CORS blocking)

**Solution:**
1. ✅ Set `VITE_API_URL` in Netlify → Redeploy
2. ✅ Set `FRONTEND_URL` in Render → Auto redeploys
3. ✅ Wait for both → Test

---

## If Still Not Working:

Run this in browser console on Netlify site:
```javascript
fetch('https://sql-dashboard-backend.onrender.com/api/data')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e));
```

And share the error message with me.
