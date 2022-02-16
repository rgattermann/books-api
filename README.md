# Books-api

Bookshelf é uma aplicação api CRUD de livros que faz uso express, typeorm, jest, mongodb.

## Instalação

Será necessário já possuir o git e yarn instalados para dai sim.

```bash
git clone https://github.com/rgattermann/books-api

cd books-api

```
## Execução
O projeto deve ser executado com o uso do docker, pois além de possuir um servidor http, existem outros dois containers. Um deles responsável por gerenciar a base do mongodb e outro para a execução da migration inicial.

Para iniciar a aplicação via docker, antes é preciso ter o docker e docker-compose instalados. A partir disso, basta executar o seguinte comando:
```bash
docker-compose -up
```

Assim a aplicação é inicializada no modo de desenvolvimento. O endereço disponibilizado para acesso é o seguinte endereço [http://localhost:3334](http://localhost:3334).

Para consumir a api foi utilizada a aplicação [Insominia](https://insomnia.rest), caso for utilizar este, basta importar o arquivo <strong>Insomnia_BookStore.json</strong> que contem os endpoints disponíveis.

## Dados de login
A aplicação já possui um usuário e senhas iniciais, devendo ser informados no endpoint POST /sessions, os seguintes dados:
```bash
email: rodrigo.gattermann@gmail.com
password: teste123
```

## Execução dos testes
Para execução dos testes preciso executar o seguinte comando:
```bash
docker container exec api-dev yarn test
```
