# PW---Trabalho-I---API---PedroPMello

Esta é a API desenvolvida em Node.js para a aplicação "Site de Filmes". Ela fornece os dados e a lógica de negócios para o frontend, incluindo autenticação de usuários, gerenciamento de filmes e controle de acesso baseado em funções (administrador/usuário).

## Funcionalidades

* **Autenticação de Usuários:**
    * Login de usuários e administradores via email e senha.
    * Geração de JWT (JSON Web Token) para sessões seguras.
* **Gerenciamento de Usuários (CRUD):**
    * Criar novos usuários (para cadastro).
    * Listar usuários (apenas para fins internos/debug, ou pode ser restrito).
    * Obter detalhes de um usuário específico (restrito ao próprio usuário ou admin).
    * Atualizar informações de usuário (nome, email, senha).
    * Remover usuários (apenas administradores).
* **Gerenciamento de Administradores (CRUD):**
    * Listar administradores.
    * Obter detalhes de um administrador específico.
    * Criar, atualizar e remover administradores (geralmente ações restritas a outros administradores ou definidas na inicialização do sistema).
* **Gerenciamento de Filmes (CRUD):**
    * Listar todos os filmes.
    * Obter detalhes de um filme específico.
    * Criar novos filmes (apenas autenticados, com `administrador_id`).
    * Atualizar filmes existentes (apenas autenticados).
    * Remover filmes (apenas administradores, com validação de `role`).
* **Controle de Acesso (Authorization):**
    * Middleware de autenticação JWT para proteger rotas.
    * Middleware de autorização para restringir operações de `DELETE` apenas a administradores.
* **Banco de Dados:** Utiliza PostgreSQL para persistência de dados.

## Rotas da API

Todas as rotas são prefixadas com `/api`.

* **Autenticação:**
    * `POST /api/login` - Realiza o login do usuário/administrador.
* **Usuários:**
    * `POST /api/usuarios` - Cria um novo usuário (cadastro).
    * `GET /api/usuarios` - Lista todos os usuários (requer autenticação).
    * `GET /api/usuarios/:id` - Obtém detalhes de um usuário específico (requer autenticação).
    * `PUT /api/usuarios/:id` - Atualiza informações de um usuário (requer autenticação).
    * `DELETE /api/usuarios/:id` - Remove um usuário (requer autenticação e role 'admin').
* **Administradores:**
    * `POST /api/administradores` - Cria um novo administrador.
    * `GET /api/administradores` - Lista todos os administradores.
    * `GET /api/administradores/:id` - Obtém detalhes de um administrador específico.
    * `PUT /api/administradores/:id` - Atualiza informações de um administrador.
    * `DELETE /api/administradores/:id` - Remove um administrador.
* **Filmes:**
    * `GET /api/filmes` - Lista todos os filmes.
    * `GET /api/filmes/:id` - Obtém detalhes de um filme específico.
    * `POST /api/filmes` - Cria um novo filme (requer autenticação).
    * `PUT /api/filmes/:id` - Atualiza informações de um filme (requer autenticação).
    * `DELETE /api/filmes/:id` - Remove um filme (requer autenticação e role 'admin').

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js.
* **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
* **`pg`:** Driver Node.js para PostgreSQL.
* **`jsonwebtoken` (JWT):** Para autenticação baseada em tokens.
* **`dotenv`:** Para carregar variáveis de ambiente de um arquivo `.env`.
* **`cors`:** Para habilitar Cross-Origin Resource Sharing.

## Configuração do Banco de Dados:
        ```sql
        -- Tabela administrador
        CREATE TABLE administrador (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL
        );

        -- Tabela usuario
        CREATE TABLE usuario (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL
        );

        -- Tabela filme
        CREATE TABLE filme (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            sinopse TEXT,
            ano INTEGER,
            genero VARCHAR(255),
            elenco TEXT,
            plataforma VARCHAR(255),
            administrador_id INTEGER,
            FOREIGN KEY (administrador_id) REFERENCES administrador(id) ON DELETE SET NULL
        );
        
        ```

## Deploy

Esta API está hospedada no Render e pode ser acessada em:

(https://dashboard.render.com/web/srv-d1evpo7fte5s73a9m1a0/deploys/dep-d1evpo7fte5s73a9m1fg?r=2025-06-27%4002%3A06%3A29%7E2025-06-27%4002%3A09%3A07)

## Projeto Relacionado

* **Frontend:** (https://github.com/PedroPMello/Trabalho-I---PWA---PedroPMello)
