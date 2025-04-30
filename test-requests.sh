#!/usr/bin/env bash

# URL base
BASE_URL="${1:-http://localhost:6001}"

# Email e senha de teste
EMAIL="user@example.com"
PASSWORD="senha123"

# Placeholder de tokens e IDs
ACCESS_TOKEN="<accessToken>"
REFRESH_TOKEN="<refreshToken>"
DEPOSIT_ID="<depositId>"

set -e

echo "1) Registrar usuário"
curl -X POST "${BASE_URL}/auth/register" \
  -H 'Content-Type: application/json' \
  -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}'
echo -e '\n'

echo "2) Login"
curl -X POST "${BASE_URL}/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}'
echo -e '\n'

echo "3) Listar depósitos (token necessário)"
echo "(insira ACCESS_TOKEN no script)"
curl -X GET "${BASE_URL}/deposits" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e '\n'

echo "4) Criar depósito"
curl -X POST "${BASE_URL}/deposits" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"title":"Novo Depósito","description":"Descrição do teste"}'
echo -e '\n'

echo "5) Atualizar depósito"
curl -X PUT "${BASE_URL}/deposits/$DEPOSIT_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"title":"Título Atualizado","description":"Nova descrição"}'
echo -e '\n'

echo "6) Inativar depósito"
curl -X DELETE "${BASE_URL}/deposits/$DEPOSIT_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e '\n'

echo "7) Filtrar depósitos (ativos e por título)"
curl -X GET "${BASE_URL}/deposits?title=Produção&active=true" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e '\n'

echo "8) Renovar tokens"
curl -X POST "${BASE_URL}/auth/refresh" \
  -H 'Content-Type: application/json' \
  -d '{"refreshToken":"'$REFRESH_TOKEN'"}'
echo -e '\n'

echo "9) Logout"
curl -X POST "${BASE_URL}/auth/logout" \
  -H 'Content-Type: application/json' \
  -d '{"refreshToken":"'$REFRESH_TOKEN'"}'
echo -e '\n'
