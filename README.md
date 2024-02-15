## Sistema de reservas de poltronas de ônibus
 
Utilizando o JSON Server para criar requisições de uma API Fake

## Tecnologias:
- HTML
- CSS
- JS
- NodeJs

## Construção do projeto

1. Primeiro é preciso ter o `Node.Js` instalado no sistema,
na Alura onde eu faço meus cursos de progamação, tem um guia ensinando a instalar:
[(Como Instalar o Node.js (Windows, Linux e macOS)](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?_gl=1*13z5q37*_ga*MTA4NDkxNjE5LjE3MDgwMjM3MzE.*_ga_1EPWSW3PCS*MTcwODAyMzczMS4xLjEuMTcwODAyMzk2NS4wLjAuMA..*_fplc*SVE2MkttejRWeG9VbkpKdFhFMnRBYW1LNEkzaFJEdEE4c1c2SyUyQmM4S2RPYWJlSFQwQkViZkprdlh0M1hYNElpNncwQUNOSThOSFhHbkVDNCUyRlVLYVR2dmlnZWVmQkwlMkZTMTFlMGpwRUttU3l6SlBON3FVMlVMcFpaZFFHUjJRJTNEJTNE)

2. Agora você precisará instalar o `JSON Server`.
O Json Server é uma biblioteca do NodeJS
e para instalar será via `NPM` para simular uma `API REST`.
O ´json-server´ é um pacote que nos ajuda a simular um servidor.
Para instalar basta digitar os seguintes códigos no terminal do seu projeto e apertar "Enter"

```
npm init
```
Depois

```
npm install json-server
```
3. Criar o `banco de dados` (localmente).
Ele está com o nome `db.json` e ali será armazenado as informações das reservas

4. Iniciando o `JSON Server`. Toda vez que for usar as requisições da API é preciso ir no terminal e digitar
o seguinte comando:

```
json-server --watch db.json
```
Ele precisa localizar o diretório do arquivo do banco de dados

## Como funciona o sistema


