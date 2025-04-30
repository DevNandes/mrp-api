#!/usr/bin/env bash
# Script de inativação de depósito: solicita Base URL, faz login e inativa depósito (DELETE)
set -e
read -p "Base URL (default http://localhost:6001): " INPUT_URL
BASE_URL=${INPUT_URL:-http://localhost:6001}

# Autenticar e obter ACCESS_TOKEN
source "$(dirname "$0")/login.sh" "$BASE_URL"

# Coletar ID para inativação
read -p "ID do depósito a inativar: " DEPOSIT_ID

echo "
Inactivating deposit $DEPOSIT_ID at $BASE_URL/deposits/$DEPOSIT_ID..."
response=$(curl -s -X DELETE "$BASE_URL/deposits/$DEPOSIT_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$response" | jq .
