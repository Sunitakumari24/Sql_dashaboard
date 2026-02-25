#!/bin/bash

echo "🔄 Waiting for Render deployment..."
echo "Testing backend every 10 seconds..."
echo ""

for i in {1..20}; do
    echo "Attempt $i:"
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://sql-dashboard-backend.onrender.com/api/data)
    
    if [ "$STATUS" = "200" ]; then
        echo "✅ BACKEND IS WORKING!"
        echo ""
        echo "Testing data:"
        curl -s https://sql-dashboard-backend.onrender.com/api/data | head -200
        echo ""
        echo "🎉 SUCCESS! Now check frontend:"
        echo "https://sqldashaboard.vercel.app"
        exit 0
    else
        echo "❌ Status: $STATUS (waiting...)"
    fi
    
    sleep 10
done

echo ""
echo "⚠️ Backend still not ready. Check Render dashboard for deployment status."
