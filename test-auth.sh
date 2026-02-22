#!/bin/bash

BASE_URL="http://localhost:3000"
COOKIE_JAR="cookies.txt"

# Generate random email to avoid collision
EMAIL="test_$(date +%s)@example.com"
PASSWORD="password123"
NAME="Test User"

echo "Testing Authentication Flow..."
echo "--------------------------------"

# 1. Register
echo "1. Registering user ($EMAIL)..."
curl -s -c $COOKIE_JAR -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\", \"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  | grep "user" && echo "  -> Register Success" || echo "  -> Register Failed"

# 2. Check Me (Should be logged in after register)
echo "2. Checking /api/auth/me (After Register)..."
curl -s -b $COOKIE_JAR "$BASE_URL/api/auth/me" \
  | grep "$EMAIL" && echo "  -> Valid Session" || echo "  -> No Session"

# 3. Logout
echo "3. Logging out..."
curl -s -b $COOKIE_JAR -c $COOKIE_JAR -X POST "$BASE_URL/api/auth/logout" \
  | grep "Logged out" && echo "  -> Logout Success" || echo "  -> Logout Failed"

# 4. Check Me (Should be null)
echo "4. Checking /api/auth/me (After Logout)..."
curl -s -b $COOKIE_JAR "$BASE_URL/api/auth/me" \
  | grep "null" && echo "  -> Session Cleared" || echo "  -> Session Still Active"

# 5. Login
echo "5. Logging in..."
curl -s -c $COOKIE_JAR -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  | grep "user" && echo "  -> Login Success" || echo "  -> Login Failed"

rm $COOKIE_JAR
echo "--------------------------------"
echo "Done."
