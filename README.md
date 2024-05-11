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
- Github Actions para CI/CD

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

| VARIAVEL   | DESCRIÇÃO                       | DEFAULT     |
|------------|---------------------------------|-------------|
| PORT       | Porta onde o servidor irá rodar | 3000        |
| NODE_ENV   | Ambiente de execução            | development |
| LOG_LEVEL  | Nível de log                    | debug       |
| LOG_MODULE | Quais modulos irão logar        | *           |

## Deploy na AWS

O projeto está configurado para fazer deploy na AWS utilizando Terraform. Para isso, é necessário configurar as variáveis de ambiente `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`.

O deploy é feito através do Github Actions, que roda o script `cicd.yaml` e faz os testes e deplois o deploy na AWS.

## Terraform

Os scripts do terraform estão no diretório `terraform`. O terraform irá criar um cluster do tipo Fargate ECS na AWS. Irá configurar os logs no CloudWatch e irá criar um load balancer para a expor a aplicação.

Para configurar o terraform é necessário criar um arquivo `terraform.tfvars` com as seguintes variáveis:

```terraform
aws_access_key = "AWS_ACCESS_KEY"
aws_secret_key = "AWS_SECRET_KEY"
aws_region = "us-east-1"
```

Para configurar o cluster do Fargate é necessário editar o arquivo `variables.tf`. Nele é possível configurar o nome do cluster, o nome do serviço, a porta onde a aplicação irá rodar e a imagem do container. Todas as configurações estão no arquivo `variables.tf`.

Para configura o Fargate cluster no AWS é necessário rodar os seguintes comandos:

```bash
terraform init
```

```bash
terraform plan
```

```bash
terraform apply
```
