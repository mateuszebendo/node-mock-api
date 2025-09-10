# API Mock Dinâmica com Persistência

## Sobre o Projeto

Esta é uma API mock simples construída com **Node.js** e **Express**, projetada para criar rapidamente endpoints RESTful para desenvolvimento e testes.  
A principal característica é a capacidade de criar novos endpoints dinamicamente através de uma única requisição.  
Todos os dados criados são salvos em um arquivo local `data.json`, garantindo que eles persistam mesmo após o servidor ser reiniciado.

## Funcionalidades

- **Criação Dinâmica de Endpoints**: Crie novos recursos (como `/usuarios`, `/produtos`) sem precisar alterar o código.  
- **Operações CRUD Básicas**: Suporte automático para `GET` (listar todos), `POST` (criar novo item) e `DELETE` (deletar por ID) para cada endpoint criado.  
- **Persistência de Dados**: Todos os dados são salvos no arquivo `data.json` na raiz do projeto.  
- **IDs Automáticos**: Novos itens criados via `POST` recebem um `id` numérico e sequencial automaticamente.  

## Como Começar

### Pré-requisitos

- Node.js instalado na sua máquina.

### Instalação das Dependências

No terminal, na pasta do projeto, execute o comando:

```bash
npm install express cors body-parser
```

### Iniciando o Servidor

Execute o comando (substitua `nome_do_arquivo.js` pelo nome real do seu arquivo):

```bash
node nome_do_arquivo.js
```

O servidor será iniciado na porta **3000**:  
[http://localhost:3000](http://localhost:3000)

## Como Usar a API

### 1. Criar um novo Endpoint (Recurso)

Para criar um conjunto de rotas para um novo recurso, como `produtos`, envie a seguinte requisição:

- **Método**: `POST`  
- **URL**: `http://localhost:3000/endpoints`  
- **Corpo da Requisição (JSON)**:  

```json
{ "endpoint": "produtos" }
```

Após essa requisição, as rotas `/produtos` e `/produtos/:id` estarão prontas para uso.

---

### 2. Interagir com o Endpoint Criado (Exemplo: `/produtos`)

#### Listar todos os itens

- **Método**: `GET`  
- **URL**: `http://localhost:3000/produtos`  

#### Adicionar um novo item

- **Método**: `POST`  
- **URL**: `http://localhost:3000/produtos`  
- **Corpo da Requisição (JSON)**:  

```json
{ "nome": "Livro de Node.js", "preco": 79.90 }
```

A API irá responder com o objeto criado, incluindo um `id` único.

#### Deletar um item pelo ID

- **Método**: `DELETE`  
- **URL**: `http://localhost:3000/produtos/1` (onde `1` é o ID do item a ser deletado).

---

Você pode criar quantos endpoints quiser (como `usuarios`, `pedidos`, etc.) repetindo o primeiro passo.
