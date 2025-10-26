# Teste Tecnico Virtex

## Arquitetura da Aplicação:

A arquitetura da aplicação é composta por uma arquitetura cliente-servidor, onde temos o cliente sendo o front-end da aplicação e o back-end sendo o servidor, além do banco de dados para a persistência dos dados.

## Tecnologias Utilizadas no Projeto:

Para a criação da arquitetura da aplicação foram utilizados:

- Docker
- Docker Compose

Para o Front-end da aplicação foram utilizados:

- React
- TailwindCSS
- Shadcn.

Para o Back-end da aplicação foram utilizados:

- TypeScript
- Nest.js
- Prisma

Para o Banco de Dados da aplicação foi utilizado:

- PostgreSQL

## Execultando o Projeto:

### Obtendo os arquivos do projeto:

    git clone https://github.com/David-Marcoss/virtex-teste-tecnico.git

### Configurando variaveis de ambiente:

1. Acesse a pasta Back-end e crie um arquivo na raiz do projeto com o titulo **.env** acesse o arquivo **.env.example** copie seu conteudo e cole no arquivo **.env**:

2. Acesse a pasta Front-end e crie um arquivo na raiz do projeto com o titulo **.env** acesse o arquivo **.env.example** copie seu conteudo e cole no arquivo **.env**:

### Execultando a aplicação:

Dentro da pasta do projeto, abra um terminal e execulte o comando:

```
 docker-compose up --build
```

### Se tudo ocorrer bem voce deve ser capaz de acessar aplicação no seu navegador acessando a rota:

### Rota front-end:

    http://localhost:5173/

### Rota da API:

    http://localhost:3000/

### Para acessar a documentação da api da aplicação, acesse no navegador a rota:

```
 http://localhost:3000/api
```
