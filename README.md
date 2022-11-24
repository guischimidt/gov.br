<table>
  <tr>
      <td><h1>Serviços GOV.BR</h1></td>
  </tr>
</table>


## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Projeto funcionando](#projeto-funcionando)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto

Esta aplicação consome a API (http://api.portaldatransparencia.gov.br/api-de-dados/) para exibição dos serviços disponibilizados pelo governo e consome a API (https://servicodados.ibge.gov.br/api/v1) para exibição de UF e Município, ambos via Fetch.
<br />

### Rotas da aplicação

| Método | Caminho da Rota | Descrição |
|---|---|---|
| GET | http://localhost:port/auxilio-brasil/| Realiza a consulta dos valores de Auxílio Brasil destinados a cada município, por mês. |
| GET | http://localhost:port/auxilio-emergencial/| Realiza a consulta dos valores de Auxílio Emergencial destinados a determinado CPF. |


## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.
```bash
$ git clone https://github.com/guischimidt/gov.br
```

### __Path__
  Instale as dependências
```bash
$ npm install
$ npm start
```

## Projeto funcionando
https://gov-br.onrender.com/

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**guigoschimidt@gmail.com**](mailto:guigoschimidt@gmail.com)
