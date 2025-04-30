#!/usr/bin/env bash
# Script de teste GET /deposits: solicita BASE_URL e credenciais, obtém token e lista depósitos
set -e
read -p "Base URL (default http://localhost:6001): " INPUT_URL
BASE_URL=${INPUT_URL:-http://localhost:6001}
# Source login.sh para obter ACCESS_TOKEN
source "$(dirname "$0")/login.sh" "$BASE_URL"

echo "
Fetching deposits from $BASE_URL/deposits..."
curl -s -X GET "$BASE_URL/deposits" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq .