#!/usr/bin/env bash
# Script de atualização de depósito: solicita Base URL, faz login, coleta dados do depósito e atualiza
set -e
read -p "Base URL (default http://localhost:6001): " INPUT_URL
BASE_URL=${INPUT_URL:-http://localhost:6001}

# Autenticar e obter ACCESS_TOKEN
source "$(dirname "$0")/login.sh" "$BASE_URL"

# Coletar dados para atualização
read -p "ID do depósito: " DEPOSIT_ID
read -p "Novo título: " TITLE
read -p "Nova descrição: " DESCRIPTION

echo "
Updating deposit $DEPOSIT_ID on $BASE_URL/deposits/$DEPOSIT_ID..."
response=$(curl -s -X PUT "$BASE_URL/deposits/$DEPOSIT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{\"title\":\"$TITLE\",\"description\":\"$DESCRIPTION\"}")

echo "$response" | jq .