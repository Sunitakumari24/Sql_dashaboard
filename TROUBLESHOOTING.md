# Frontend Data Not Showing - Troubleshooting Checklist

## Issue: Data not showing on deployed frontend

### Step 1: Verify Backend is Working
Open your Render backend URL in browser:
```
https://your-backend-app.onrender.com/api/data
```
✅ Should return JSON data with student records
❌ If you see an error, backend deployment has issues

### Step 2: Check Vercel Environment Variable
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `VITE_API_URL` is set to your Render backend URL
3. **Important:** URL should be WITHOUT trailing slash
   - ✅ Correct: `https://your-app.onrender.com`
   - ❌ Wrong: `https://your-app.onrender.com/`

### Step 3: Check Browser Console
1. Open your deployed Vercel site
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Look for errors:

**Common Errors:**

**A) CORS Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Update `FRONTEND_URL` in Render backend environment variables
- Should match your Vercel URL exactly: `https://your-app.vercel.app`
- After updating, redeploy backend on Render

**B) 404 Not Found:**
```
GET https://your-backend-app.onrender.com/api/data 404
```
**Fix:** Backend route issue - verify backend is running

**C) Network Error:**
```
Network Error or Failed to fetch
```
**Fix:** Backend might be sleeping (Render free tier) - wait 30 seconds and refresh

**D) Wrong URL:**
```
GET http://localhost:5000/api/data
```
**Fix:** Environment variable not set in Vercel - follow Step 2

### Step 4: Verify CORS on Backend
Check Render environment variables:
1. Go to Render Dashboard → Your Backend Service → Environment
2. Verify `FRONTEND_URL` is set to your Vercel URL
3. Should be: `https://your-app.vercel.app` (without trailing slash)
4. If you changed it, click "Manual Deploy" → "Deploy latest commit"

### Step 5: Force Redeploy Frontend
After setting environment variable:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Click **"Redeploy"** button
4. Wait for deployment to complete

### Step 6: Check Network Tab
1. Open deployed Vercel site
2. Press F12 → Go to **Network** tab
3. Refresh page
4. Look for requests to your backend URL
5. Click on each request to see:
   - Request URL (should be your Render URL)
   - Status Code (should be 200)
   - Response (should contain data)

### Step 7: Test Backend Endpoints Directly

Open these URLs in your browser:

1. **All Data:**
   ```
   https://your-backend-app.onrender.com/api/data
   ```

2. **Summary:**
   ```
   https://your-backend-app.onrender.com/summary
   ```

3. **Pass/Fail:**
   ```
   https://your-backend-app.onrender.com/pass-fail
   ```

All should return JSON data.

### Step 8: Check Render Logs
1. Go to Render Dashboard → Your Backend Service → Logs
2. Look for:
   - "MySQL connected successfully!" (good)
   - CORS errors (need to fix FRONTEND_URL)
   - Database connection errors (check DB credentials)

### Common Solutions:

#### Solution 1: Environment Variable Not Set
```bash
# In Vercel Dashboard:
VITE_API_URL=https://your-backend-app.onrender.com

# Then redeploy
```

#### Solution 2: CORS Issue
```bash
# In Render Dashboard:
FRONTEND_URL=https://your-app.vercel.app

# Then redeploy backend
```

#### Solution 3: Backend Sleeping (Free Tier)
Render free tier services sleep after 15 minutes of inactivity.
- First request takes 30-60 seconds to wake up
- Keep refreshing, it will load

#### Solution 4: Multiple Environment Variables
If you have multiple frontend domains (preview + production):
```bash
# In Render, set FRONTEND_URL to:
https://your-app.vercel.app,https://your-app-preview.vercel.app
```

Or use `*` temporarily for testing:
```bash
FRONTEND_URL=*
```

### Quick Test Script

Open browser console on your Vercel site and run:

```javascript
// Check what API URL is being used
console.log('API URL:', import.meta.env.VITE_API_URL);

// Test fetch
fetch('https://your-backend-app.onrender.com/api/data')
  .then(r => r.json())
  .then(d => console.log('Data:', d))
  .catch(e => console.error('Error:', e));
```

Replace `your-backend-app.onrender.com` with your actual backend URL.

---

## Still Not Working?

Provide the following information:
1. Your Render backend URL
2. Your Vercel frontend URL
3. Screenshot of browser console errors
4. Screenshot of Network tab showing failed requests
5. Screenshot of Vercel environment variables
6. Screenshot of Render environment variables (hide sensitive values)
