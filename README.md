# Projeto de um sistema de verificação de json web tokens (JWT) em Node.js

Projeto utilizando NestJS para criar um sistema de verificação de json web tokens (JWT) em Node.js. Sistema desenvolvido como estudo de caso para processo seletivo do Itau.

## Tecnologias utilizadas

- Node.js
- NestJS
- Jest
- Docker
- Terraform
- AWS

## Decisões de projeto

- Documentação automatizada utilizando swagger
- class-validator para validação de dados com decorators
- pino-http para logar requisições
- helmet para segurança
- Docker para containerização da aplicação
- Terraform para deploy na AWS
- Adicionado endpoint /helth para verificar se a aplicação está rodando
- Usando class-transformer para transformar os dados de entrada

## Endpoints

### GET /verify/jwt?token=token

Verifica se o token é válido

### GET /health/check

Return healthcheck da aplicação

### GET /health/ping

Return pong

## Como rodar o projeto

### Bare Metal

1. Instale as dependencias

```bash
npm install
```

2. Configure as variaveis de ambiente

```bash
cp .env.example .env
```

3. Rode o projeto

```bash
npm run start:dev
```

### Docker

1. Configure as variaveis de ambiente

```bash
cp .env.example .env
```

2. Rode o projeto

```bash
docker compose up
```

## Como rodar os testes

1. Para rodar os testes unitários

```bash
npm run test:unit
```

2. Para rodar os testes de integração

```bash
npm run test:e2e
```

## Variaveis de ambiente

VARIAVEL | DESCRIÇÃO | DEFAULT
PORT | Porta onde o servidor irá rodar | 3000
NODE_ENV | Ambiente de execução | development
LOG_LEVEL | Nível de log | debug
LOG_MODULE | Quais modulos irão logar | *

## Deploy na AWS

O projeto está configurado para fazer deploy na AWS utilizando Terraform. Para isso, é necessário configurar as variáveis de ambiente `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`.
