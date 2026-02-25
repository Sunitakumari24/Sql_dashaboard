#!/bin/bash

echo "🔍 Testing Database Connection..."
echo ""

# Kill any existing server
lsof -ti:5000 | xargs kill -9 2>/dev/null

# Start server
cd /home/khushbu/sql-dashbord/backend
echo "Starting backend server..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test endpoints
echo ""
echo "Testing /api/data endpoint..."
curl -s http://localhost:5000/api/data | head -50

# Cleanup
kill $SERVER_PID 2>/dev/null

echo ""
echo "✅ Test complete!"
