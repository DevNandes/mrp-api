#!/usr/bin/env bash
# Script de logout: solicita BASE_URL, faz login para obter REFRESH_TOKEN e envia logout (requer jq e login.sh)
set -e
read -p "Base URL (default http://localhost:6001): " INPUT_URL
BASE_URL=${INPUT_URL:-http://localhost:6001}

echo "Logging in to obtain refresh token..."
source "$(dirname "$0")/login.sh" "$BASE_URL"

echo "Logging out from $BASE_URL/auth/logout..."
curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}" | jq .
