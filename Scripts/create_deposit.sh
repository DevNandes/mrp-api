#!/usr/bin/env bash
# Script de criação de depósito: solicita Base URL, faz login e cria depósito (POST)
set -e
read -p "Base URL (default http://localhost:6001): " INPUT_URL
BASE_URL=${INPUT_URL:-http://localhost:6001}

# Autenticar e obter ACCESS_TOKEN
source "$(dirname "$0")/login.sh" "$BASE_URL"

# Coletar dados para criação
read -p "Título do depósito: " TITLE
read -p "Descrição do depósito: " DESCRIPTION

echo "
Creating deposit on $BASE_URL/deposits..."
response=$(curl -s -X POST "$BASE_URL/deposits" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{\"title\":\"$TITLE\",\"description\":\"$DESCRIPTION\"}")

echo "$response" | jq .