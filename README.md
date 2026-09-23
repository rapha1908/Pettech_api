# Pettech API

API REST para um pet shop, desenvolvida para praticar Node.js com TypeScript. Gerencia usuários, pessoas, endereços, categorias e produtos, com autenticação via JWT.

## Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** — servidor HTTP
- **PostgreSQL** — acessado com o driver `pg` (SQL puro) e com **TypeORM**
- **Zod** — validação de variáveis de ambiente e dos dados das requisições
- **@fastify/jwt** + **bcryptjs** — autenticação e hash de senhas
- **ESLint** + **Prettier** — padronização de código

## Arquitetura

O projeto segue uma separação em camadas:

```
src/
├── http/
│   ├── controllers/   # rotas e validação da entrada (Zod)
│   └── middlewares/   # validação do JWT
├── use-cases/         # regras de negócio
│   ├── factory/       # montam cada use case com seu repositório
│   └── errors/        # erros de domínio
├── repositories/      # interfaces de acesso a dados
│   ├── pg/            # implementações com SQL puro (user, person, address)
│   └── typeorm/       # implementações com TypeORM (product, category)
├── entities/          # entidades e interfaces do domínio
├── lib/               # conexões com o banco (pg e TypeORM) e migrations
└── env/               # leitura e validação das variáveis de ambiente
```

Os controllers dependem apenas das interfaces dos repositórios, então trocar a forma de acesso ao banco não afeta as regras de negócio.

## Como rodar

### Pré-requisitos

- Node.js 20+
- PostgreSQL

### Passos

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo de variáveis de ambiente e preencha os valores
cp .env.example .env

# 3. Rode as migrations
npm run migrate

# 4. Inicie o servidor em modo de desenvolvimento
npm run start:dev
```

O servidor sobe em `http://localhost:3000` (ou na porta definida em `PORT`).

> As tabelas `user`, `person` e `address` são acessadas via SQL puro e precisam existir no banco antes de usar essas rotas.

### Variáveis de ambiente

| Variável            | Descrição                                        |
| ------------------- | ------------------------------------------------ |
| `PORT`              | Porta do servidor (padrão: `3000`)               |
| `NODE_ENV`          | `development`, `production` ou `test` (padrão: `development`) |
| `DATABASE_HOST`     | Host do PostgreSQL                               |
| `DATABASE_PORT`     | Porta do PostgreSQL                              |
| `DATABASE_USER`     | Usuário do banco                                 |
| `DATABASE_PASSWORD` | Senha do banco                                   |
| `DATABASE_NAME`     | Nome do banco                                    |
| `JWT_SECRET`        | Chave usada para assinar os tokens JWT           |

Se alguma variável obrigatória estiver faltando ou inválida, o servidor não inicia.

### Scripts

| Comando             | Descrição                                   |
| ------------------- | ------------------------------------------- |
| `npm run start:dev` | Servidor em modo desenvolvimento (watch)    |
| `npm run build`     | Gera o build em `build/`                    |
| `npm start`         | Roda o build de produção                    |
| `npm run migrate`   | Executa as migrations do TypeORM            |

## Autenticação

Todas as rotas exigem um token JWT, exceto o cadastro de usuário e o login.

1. Crie um usuário com `POST /user`
2. Faça login com `POST /user/signin` para receber o token
3. Envie o token nas demais requisições:

```
Authorization: Bearer <token>
```

O token expira em 10 minutos.

## Rotas

### Usuário

| Método | Rota           | Autenticação | Descrição                         |
| ------ | -------------- | :----------: | --------------------------------- |
| POST   | `/user`        |      —       | Cria um usuário                   |
| POST   | `/user/signin` |      —       | Faz login e retorna o token       |
| GET    | `/user/:id`    |      ✔       | Busca um usuário e seus dados de pessoa |

```json
// POST /user  e  POST /user/signin
{ "username": "joao", "password": "minhasenha" }
```

### Pessoa

| Método | Rota      | Autenticação | Descrição        |
| ------ | --------- | :----------: | ---------------- |
| POST   | `/person` |      ✔       | Cria uma pessoa  |

```json
{
  "cpf": "12345678900",
  "name": "João Silva",
  "birth": "1990-05-20",
  "email": "joao@email.com",
  "user_id": 1
}
```

### Endereço

| Método | Rota                                         | Autenticação | Descrição                             |
| ------ | -------------------------------------------- | :----------: | ------------------------------------- |
| POST   | `/address`                                   |      ✔       | Cria um endereço                      |
| GET    | `/address/person/:personId?page=1&limit=10`  |      ✔       | Lista os endereços de uma pessoa      |

```json
{
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01000-000",
  "person_id": 1
}
```

### Categoria

| Método | Rota        | Autenticação | Descrição          |
| ------ | ----------- | :----------: | ------------------ |
| POST   | `/category` |      ✔       | Cria uma categoria |

```json
{ "name": "Rações" }
```

### Produto

| Método | Rota                          | Autenticação | Descrição                     |
| ------ | ----------------------------- | :----------: | ----------------------------- |
| GET    | `/product?page=1&limit=10`    |      ✔       | Lista produtos (paginado)     |
| GET    | `/product/:id`                |      ✔       | Busca um produto              |
| POST   | `/product`                    |      ✔       | Cria um produto               |
| PUT    | `/product/:id`                |      ✔       | Atualiza um produto           |
| DELETE | `/product/:id`                |      ✔       | Remove um produto             |

```json
// POST /product  e  PUT /product/:id
{
  "name": "Ração Premium 10kg",
  "description": "Ração para cães adultos",
  "image_url": "https://exemplo.com/racao.jpg",
  "price": 189.9,
  "categories": [{ "id": 1, "name": "Rações" }]
}
```

## Autor

Raphael De Santi
