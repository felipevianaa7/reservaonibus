## Sistema de reservas de poltronas de ônibus
 
Utilizando o JSON Server para criar requisições de uma API Fake

## Tecnologias:
- HTML
- CSS
- JS
- NodeJs

## Construção do projeto

1. É preciso ter o `Node.Js` instalado no sistema,
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
## <p style="width: 600px; height: 1200px; padding-top: 30px;">![print do site](https://github.com/felipevianaa7/reservaonibus/assets/53532151/ba2862fa-097b-49cf-beae-10c96a346b0a)
</p>

São 16 botões indicados por uma cor, verde mostra os disponíveis e vermelho os ocupados.
Ao clicar no botão que está disponível, ele passa para a cor amarelo indicando que foi selecionado.
após o  clique vai aparecer a opção do botão `Reservar`, pode selecionar mais de um para a reserva.

Depois de definir a reserva será aberto um formulário, nele é preciso preencher todos os dados. Existem duas opções,
de `Enviar` e `Cancelar`.

## <p style="width: 600px; height: 1200px; padding-top: 30px;">![print do formulario](https://github.com/felipevianaa7/reservaonibus/assets/53532151/82807d16-530d-42df-884d-ab1384327cfd)
</p>

## Pré reserva
Cancelando ele também faz uma requisição com a API, ele obtem as informações que foram escritas no formulário e consegue fazer uma 
`pré reserva`. É apenas um demostrativo, mas a ideía é que se o site fosse real, na hora do pagamento o sistema reservasse a vaga
até a confirmação da compra, evitando conflitos com outros clientes.
Caso a compra não for efetuada, a `pré reserva` será cancelada depois de um tempo estipulado, eu programei para 2 minutos(tempo real). 
Depois do tempo estipulado, a `pré reserva` será cancelada e a vaga tornará a ser disponível novamente.

## Como hospedei na internet
Primeiro voce deve colocar o projeto em um repositório do Git usando o `Git bash` lá pelo terminal. Você também pode pelo GitHub Desktop.
Pelo site do GitHub não da pra upar todos os arquivos do projeto, são muitos.

Acesse o site do [Vercel](https://vercel.com), voce pode vincular sua conta do GitHub nele.
Por lá você pode fazer o deploy do seu repositório lá para ele ficar online
(No YouTube tem vídeos ensinando a fazer o deploy)

Você vai precisar agora clonar meu repositório para o seu GitHub, pode acessar aqui [json-server]([https://vercel.com](https://github.com/felipevianaa7/json-server)https://github.com/felipevianaa7/json-server)
O arquivo `db.json` desse repositório será o banco de dados do repositório que foi feito o deploy no Vercel.
Agora você também fará o deploy no Vercel desse repositório que foi clonado. 

No arquivo `js/conectaAPI.js` do repositório do projeto, voce irá trocar o caminho dos endpoints para o endereço do `json-server` que esta hospedado
no Vercel

## <p style="width: 600px; height: 1200px; padding-top: 30px;">![print do formulario](https://github.com/felipevianaa7/reservaonibus/assets/53532151/01fc9a33-6fa2-47e6-bd50-5966e3b2dbc3)
</p>

## Observações
No arquivo `js/conectaAPI.js` tive que mudar o `forEach` pelo `for...of`, que suporta o uso de `await` com funções `async`, com isso ele passou a conseguir fazer atualizações simultâneas
no banco de dados. Localmente não acontecia esse problema.

Tive que usar o método `Location.reload()` para recarregar a página no fim de cada requisição, tira a ideía do site ser assíncrono, mas tive que fazer pois não estava
atualizando as poltronas no site.

## Sugestões

1.Mudar o layout do site, design não é o meu forte, mais irei melhorar mais pra frente
2.Acrescentar um botão para cancelar as poltronas marcadas
3. Enviar email para a pessoa confirmando a reserva da poltrona
4. Colocar uma simulação de pagamento para melhorar a parte de pré-reserva do sistema














