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
   git clone https://github.com/seu-usuario/mrp-api.git
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

## 🧪 Testes

Em breve estará disponível o arquivo `test.md` com instruções completas de testes automatizados (Jest + Supertest). Para começar a testar manualmente, utilize os exemplos de cURL abaixo:

1. **Criar material**:
   ```bash
   curl -X POST http://localhost:3000/materials \
     -H "Content-Type: application/json" \
     -d '{ "name": "Aço", "quantity": 100 }'
   ```

2. **Listar materiais**:
   ```bash
   curl http://localhost:3000/materials
   ```

3. **Registrar entrada de estoque**:
   ```bash
   curl -X POST http://localhost:3000/movements \
     -H "Content-Type: application/json" \
     -d '{ "material": "<ID_DO_MATERIAL>", "type": "in", "quantity": 50 }'
   ```

4. **Registrar saída de estoque**:
   ```bash
   curl -X POST http://localhost:3000/movements \
     -H "Content-Type: application/json" \
     -d '{ "material": "<ID_DO_MATERIAL>", "type": "out", "quantity": 20 }'
   ```

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