#!/usr/bin/env bash
# Script de login: solicita email e senha, obtém e exporta ACCESS_TOKEN e REFRESH_TOKEN (requer jq)
set -e
BASE_URL="${1:-http://localhost:6001}"

# Exemplo de credenciais
#EMAIL="user@example.com"
#PASSWORD="senha123"

read -p "Email: " EMAIL
read -s -p "Password: " PASSWORD
echo

response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
ACCESS_TOKEN=$(echo "$response" | jq -r .accessToken)
REFRESH_TOKEN=$(echo "$response" | jq -r .refreshToken)

# Exportar para outros scripts
export BASE_URL ACCESS_TOKEN REFRESH_TOKEN

echo "Access Token: $ACCESS_TOKEN"
echo "Refresh Token: $REFRESH_TOKEN"