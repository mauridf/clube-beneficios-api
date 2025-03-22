# Clube de Benefícios API

API RESTful para gerenciamento de clientes, produtos, compras e pagamentos em um clube de benefícios. 
Desenvolvida com Node.js, Express, Sequelize (ORM) e SQLite.

## 📌 Índice

- [Clube de Benefícios API](#clube-de-benefícios-api)
  - [📌 Índice](#-índice)
  - [📌 Requisitos](#-requisitos)
  - [⚙️ Instalação](#️-instalação)
  - [🔧 Configuração](#-configuração)
  - [▶️ Executando a API](#️-executando-a-api)
  - [📌 Endpoints](#-endpoints)
    - [📌 Clientes](#-clientes)
    - [📌 Produtos](#-produtos)
    - [📌 Compras](#-compras)
    - [📌 Pagamentos](#-pagamentos)
    - [🔑 Autenticação](#-autenticação)
  - [🛠️ Testes](#️-testes)
  - [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [🤝 Contribuição](#-contribuição)
  - [📜 Licença](#-licença)
  - [📩 Contato](#-contato)

---

## 📌 Requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- SQLite (banco de dados embutido)

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/clube-beneficios-api.git
cd clube-beneficios-api
```

Instale as dependências:

```bash
npm install
```

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
PORT=3000
JWT_SECRET=secret
```

O banco de dados SQLite será criado automaticamente ao executar a API.

## ▶️ Executando a API

Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## 📌 Endpoints

### 📌 Clientes

- `POST /api/clientes`: Cadastra um novo cliente.

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "tipoUsuario": "cliente"
}
```

- `POST /api/clientes/login`: Autentica um cliente e retorna um token JWT.

```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

- `GET /api/clientes`: Lista todos os clientes (apenas para administradores).

### 📌 Produtos

- `POST /api/produtos`: Cadastra um novo produto.

```json
{
  "nome": "Notebook",
  "descricao": "Notebook de última geração",
  "preco": 4500.00,
  "categoria": "Eletrônicos"
}
```

- `GET /api/produtos`: Lista todos os produtos.

- `GET /api/produtos/:id`: Retorna os detalhes de um produto específico.

- `PUT /api/produtos/:id`: Atualiza um produto.

- `DELETE /api/produtos/:id`: Remove um produto.

### 📌 Compras

- `POST /api/compras`: Cadastra uma nova compra.

```json
{
  "clienteId": 1,
  "produtos": [1, 2, 3],
  "status": "pendente"
}
```

- `GET /api/compras`: Lista todas as compras.

- `GET /api/compras/:id`: Retorna os detalhes de uma compra específica.

- `PUT /api/compras/:id`: Atualiza uma compra.

- `DELETE /api/compras/:id`: Remove uma compra.

- `GET /api/clientes/:clienteId/compras`: Lista as compras de um cliente específico.

### 📌 Pagamentos

- `POST /api/pagamentos`: Cadastra um novo pagamento.

```json
{
  "valor": 4500.00,
  "status": "pendente",
  "compraId": 1
}
```

- `GET /api/pagamentos`: Lista todos os pagamentos.

- `GET /api/pagamentos/:id`: Retorna os detalhes de um pagamento específico.

- `PUT /api/pagamentos/:id`: Atualiza um pagamento.

- `DELETE /api/pagamentos/:id`: Remove um pagamento.

- `GET /api/compras/:compraId/pagamentos`: Retorna o pagamento associado a uma compra.

### 🔑 Autenticação

A API usa JWT (JSON Web Token) para autenticação. Após fazer login, inclua o token no cabeçalho das requisições protegidas:

```plaintext
Authorization: Bearer <token>
```

## 🛠️ Testes

Para executar os testes, use o seguinte comando:

```bash
npm test
```

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM para interação com o banco de dados.
- **SQLite**: Banco de dados embutido.
- **JWT**: Autenticação via tokens.
- **Bcryptjs**: Criptografia de senhas.
- **Winston**: Logs de requisições e erros.
- **Jest**: Framework de testes.

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`.
4. Push para a branch: `git push origin feature/nova-feature`.
5. Abra um pull request.

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📩 Contato

- **Nome:** MAURÍCIO DIAS DE CARVALHO OLIVEIRA
- **Email:** mauridf@gmail.com
- **GitHub:** mauridf
