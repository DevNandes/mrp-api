# MRP‑API

Uma API REST em **Node.js**, **TypeScript** e **Express**, integrada ao **MongoDB Atlas (free tier)**, para um MRP (Material Requirements Planning) básico de controle de estoque e movimentações de matérias‑primas.

---

## 📦 Tecnologias

- Node.js
- TypeScript
- Express
- Mongoose
- MongoDB Atlas (free tier)
- ts-node-dev

---

## 🚀 Pré‑requisitos

- Node.js v14+ instalado
- Conta e cluster configurado no MongoDB Atlas (free tier)
- Git instalado

---

## 📥 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/DevNandes/mrp-api.git
   cd mrp-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

---

## ⚙️ Configuração

1. Crie um arquivo `.env` a partir do `.env.sample`:
   ```bash
   cp .env.sample .env
   ```
2. No `.env`, defina as variáveis:
   ```dotenv
   MONGO_URI=<sua_mongo_uri_com_nome_do_banco>
   PORT=3000
   NODE_ENV=development
   ```
3. Verifique se seu IP está liberado no Atlas (Network Access).

---

## ▶️ Execução

Inicie a API em modo de desenvolvimento:
```bash
npm run dev
```
A aplicação ficará disponível em `http://localhost:3000`.

---

## 🛣️ Endpoints da API

### Autenticação
- POST /auth/register
  - Body: `{ "name": string, "email": string, "password": string }`
- POST /auth/login
  - Body: `{ "email": string, "password": string }` (exemplo já preenchido no Swagger)
- POST /auth/refresh
  - Body: `{ "refreshToken": string }`
- POST /auth/logout
  - Body: `{ "refreshToken": string }`
  - Header: `Authorization: Bearer <token>`

### Depósitos
- GET /deposits
  - Query params opcionais: `id`, `title`, `description`, `active`
- POST /deposits
  - Body: `{ "title": string, "description": string }`
- PUT /deposits/:id
  - Body: `{ "title"?: string, "description"?: string, "active"?: boolean }`
- DELETE /deposits/:id
  - Marca o depósito como inativo

### Histórico
- GET /history
  - Query params opcionais: `where`, `type`, `user`, `from`, `to`
  - Exemplo: `/history?where=deposit&type=create&from=2025-06-01T00:00:00Z&to=2025-06-18T23:59:59Z`

---

## 🧪 Testes Automatizados e Cobertura

Rode todos os testes com Jest:
```bash
npm test
```

Para visualizar cobertura no navegador (Linux):
```bash
xdg-open coverage/lcov-report/index.html
```

---

## 📑 Documentação interativa (Swagger)

Acesse via Swagger UI para testar rotas protegidas com Bearer token:
```bash
npm run dev
```
Abra no navegador:
```
http://localhost:3000/api-docs
```
Use o botão **Authorize** para inserir o JWT e os exemplos de payload estarão prontos nos campos de request.

---

## 🤝 Contribuição

1. Fork este repositório  
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`  
3. Faça commit das suas alterações: `git commit -m 'feat: descrição do que fez'`  
4. Envie para a branch: `git push origin feature/nova-funcionalidade`  
5. Abra um Pull Request  

---

## 📄 Licença

MIT — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

> Projeto desenvolvido como checkpoint avaliativo da disciplina de Arquitetura de Software.
