
# 🏁 Projeto Lista de Compras

<h2 font-family="pattaya">Tecnologias utilizadas</h2>
<div style="display: inline_block"><br>
 <img align="center" alt="Alexandra-Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
 <img align="center" alt="Alexandra-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
</div><br>

<h2 font-family="pattaya">Descrição</h2><br>
<p font-family="robotto" font-size="16px" line-height="34px" align="justify">
Projeto do módulo 4, do curso de Desenvolvedora Web Full Stack, da Kenzie Academy Brasil. A API simula uma lista de compras, onde é possível criar, listar, 
atualizar e deletar listas  e items de um banco de dados.
</p><br>

<h2 font-family="pattaya">Requisitos técnicos:</h2><br>

# Endpoints do serviço

| Método | Endpoint | Responsabilidade |
|--------|----------|------------------|
| POST | /purchaseList | Criar uma nova lista de compras |
| GET | /purchaseList | Listar todas as listas de compras |
| GET | /purchaseList/<purchaseListId> | Listar uma lista de compras específica |
| PATCH | /purchaseList/<purchaseListId>/<itemName> | Atualiza os dados de um item da lista |
| DELETE | /purchaseList/<purchaseListId>/<itemName> | Deleta um item da lista |
| DELETE | /purchaseList/<purchaseListId> | Deleta uma lista |


## Requisitos do Serviço

Esse serviço precisa possuir uma API REST para que os demais serviços consigam criar, listar, atualizar e deletar listas de compras e items de um banco de dados.
O banco de dados deve ser volátil, um array que seja zerado toda vez que a aplicação reiniciar.

### **POST: /purchaseList**

* Deve ser possível criar uma lista contendo os seguintes dados:
  * **id**: número, gerado automaticamente na criação.
  * **listName**: string.
  * **data**: Array de objetos de itens.
     * cada item de data deverá conter:
       * **name**: string.
       * **quantity**: string.

***Regras de negócio***

* Caso de sucesso:
  * **Retorno**: um objeto contendo os dados da lista criada
  * **Status**: 201 CREATED.

**Exemplo de retorno**:

```json
{
  "id": 1,
  "listName": "feira",
  "data": [
    {
      "name": "banana",
      "quantity": "1 cacho"
    },
    {
      "name": "maçã",
      "quantity": "6 unidades"
    },
    {
      "name": "mamão",
      "quantity": "1 unidade"
    }
  ],
```

* Não deve ser possível criar uma lista ou um item com um dado que não esteja dentro dos indicados anteriormente.
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 400 BAD REQUEST.

**Exemplo de retorno**:

```json
{
  "message": "Required fields are: \"name\" and \"quantity\""
}
```

* Não deve ser possível criar uma lista ou item caso um dos dados não seja do tipo esperado.
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 400 BAD REQUEST.

**Exemplo de retorno**:

```json
{
  "message": "The list name need to be a string"
}
```

### **GET: /purchaseList**

* Deve ser possível listar todas as listas armazenadas no banco de dados.

***Regras de negócio***

* Caso de sucesso:
  * **Retorno**: um array contendo todas as listas no banco.
  * **Status**: 200 OK.
  * Exemplo de retorno:

```json
[
  {
    "id": 1,
    "listName": "feira",
    "data": [
      {
        "name": "abacaxi",
        "quantity": "1 unidade"
      },
      {
        "name": "maçã",
        "quantity": "6 unidades"
      },
      {
        "name": "mamão",
        "quantity": "1 unidade"
      }
    ]
  }
]
```

### **GET: /purchaseList/<purchaseListId>**

* Deve ser possível receber apenas uma lista com base no seu id.

***Regras de negócio***

* Caso de sucesso:
  * **Retorno**: um objeto contendo a lista especificada na url.
  * **Status**: 200 OK.
  * Exemplo de retorno:

```json
{
  "id": 1,
  "listName": "feira",
  "data": [
    {
      "name": "abacaxi",
      "quantity": "1 unidade"
    },
    {
      "name": "maçã",
      "quantity": "6 unidades"
    },
    {
      "name": "mamão",
      "quantity": "1 unidade"
    }
  ]
}
```
* Não deve ser possível obter uma lista que não existe.
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "List with id \"182476281\" does not exist"
}
```
### **PATCH: /purchaseList/<purchaseListId>/<itemName>**

* Deve ser possível atualizar um item com base em seu nome e no id da lista a qual o item pertence.

***Regras de negócio***

* Os dados permitidos para atualização são:
  * **name**: string.
  * **quantity**: string.

* Caso de sucesso:
  * **Retorno**: um objeto contendo a lista especificada na url.
  * **Status**: 200 OK.

**Exemplo de retorno**:

```json
{
  "name": "abacaxi",
  "quantity": "1 unidade"
}

```

* Não deve ser possível atualizar um item que não exista na lista indicada:
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "Item with name \"iahs923u41js\" does not exist",
}
```

* Não deve ser possível atualizar um item de uma lista que não existe:
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "List with id \"182476281\" does not exist"
}
```

* Não deve ser possível atualizar uma lista ou um item com um dado que não esteja dentro dos indicados anteriormente:
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 400 BAD REQUEST.

**Exemplo de retorno**:

```json
{
  "message": "Updatable fields are: \"name\" and \"quantity\""
}
```

* Não deve ser possível atualizar uma lista ou item caso um dos dados não seja do tipo esperado:
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 400 BAD REQUEST.

**Exemplo de retorno**:

```json
{
  "message": "The list name need to be a string"
}
```

### **DELETE: /purchaseList/<purchaseListId>/<itemName>**

***Regras de negócio***

* Deve ser possível deletar um item especificado pelo seu nome e pelo id da lista a qual pertence.

* Caso de sucesso:
  * **Retorno**: nenhum dado deve ser retornado.
  * **Status**: 204 NO CONTENT.

* Não deve ser possível deletar um item de uma lista que não existe:
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
 "message": "List with id \"182476281\" does not exist"
}
```

* Não deve ser possível deletar um item que não exista na lista indicada:
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
 "message": "Item with name \"iahs923u41js\" does not exist"
}
```

### **DELETE: /purchaseList/<purchaseListId>**

***Regras de negócio***

* Deve ser possível deletar uma lista através do seu id.

* Caso de sucesso:
  * **Retorno**: nenhum dado deve ser retornado.
  * **Status**: 204 NO CONTENT.

* Não deve ser possível deletar um item de uma lista que não existe:
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
 "message": "List with id \"182476281\" does not exist"
}
```

* Não deve ser possível deletar um item que não exista na lista indicada:
  * **Retorno**: um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
 "message": "Item with name \"iahs923u41js\" does not exist"
}
```
