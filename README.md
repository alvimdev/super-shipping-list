# 🛒 SUPER Shipping List

Uma aplicação full stack para gerenciamento de listas de compras. O sistema permite que usuários criem contas, gerenciem suas listas e itens de maneira simples, segura e organizada.  

> **Tecnologias:** Next.js 15 (App Router), React 19, TypeScript, Prisma, PostgreSQL, JWT (cookies), Swagger.

---

## 🧠 Funcionalidades

### ✅ Backend (API)
- Autenticação JWT via cookies
- CRUD completo para usuários, listas e itens
- Verificação de propriedade em todas as operações
- Documentação automática com Swagger (`/api/docs`)
- Middleware de proteção para rotas privadas
- Estrutura de serviços e validações modularizada

### 🌐 Frontend (em construção)
- [ ] Cadastro e login de usuário
- [ ] Dashboard com todas as listas
- [ ] Página de edição de listas e seus itens
- [ ] Interface interativa com Tailwind CSS

---

## 🚀 Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/alvimdev/super-shipping-list.git
cd super-shipping-list
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure os ambientes

Crie os arquivos `.env`, `.env` e `.env`:

**Exemplo:**

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/super_shipping_list
JWT_SECRET=uma-chave-bem-segura
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Rode as migrações e seed (se houver)

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

---

## 📑 Documentação da API

Acesse a documentação interativa com Swagger:

```
GET http://localhost:3000/api/docs
```

> Disponível apenas em ambiente de desenvolvimento (`NODE_ENV=development`)

---

## 🗂️ Estrutura de Pastas

```bash
.
├── app/                                   # Diretório principal do App Router (rotas, páginas e API)
│   ├── api/                               # Rotas de API (Next.js App Router)
│   │   ├── docs/                          # Página de documentação Swagger (/api/docs)
│   │   ├── lists/                         # CRUD de listas de compras
│   │   │   ├── copy/[listId]              # Endpoint para copiar listas
│   │   │   ├── [listId]/                  # Operações sobre uma lista específica
│   │   │   │   ├── items/                 # Operações com itens de uma lista
│   │   │   │   │   ├── [itemId]/          # PATCH/DELETE de item específico
│   │   │   │   │   └── toggle/[itemId]/   # Toggle de conclusão de um item
│   │   ├── login/                         # Autenticação de usuários
│   │   └── user/                          # Registro, atualização e deleção de usuário
│   │
│   ├── (auth)/                            # Páginas de login e cadastro
│   ├── layout.tsx                         # Layout padrão da aplicação
│   └── page.tsx                           # Página inicial
│
│
├── prisma/                                # Migrations e schema do banco de dados
│   ├── migrations/                        # Histórico de migrações do Prisma
│   └── schema.prisma                      # Schema principal do banco de dados
│
├── public/                                # Arquivos estáticos (imagens, ícones, etc.)
│
├── src/                                   # Código-fonte da aplicação (backend)
│   ├── errors/                            # Classes customizadas de erro (AuthError, NotFoundError etc.)
│   ├── lib/                               # Configurações globais (Prisma, autenticação)
│   ├── models/                            # Camada de acesso ao banco (Prisma)
│   ├── schemas/                           # Validações com Zod (inputs de user, list e item)
│   ├── services/                          # Lógica de negócio da aplicação (validações e regras)
│   └── utils/                             # Funções utilitárias (JWT, Swagger, validações comuns)
│
└── middleware.ts                          # Middleware para autenticação JWT (cookies)

```

---

## ✅ To-do

* [x] Estrutura da API com autenticação
* [x] CRUD para listas e itens
* [x] Testes de API com Postman / SQL CLient
* [x] Documentação Swagger
* [ ] Implementar frontend com React + Tailwind
* [ ] Testes automatizados

---

## 🛡 Segurança

* As rotas da API são protegidas por middleware JWT
* O Swagger só é acessível em ambiente de desenvolvimento
* Toda operação de lista ou item verifica se o usuário é o dono

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
