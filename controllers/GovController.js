const { json } = require("express");
const fetch = require("node-fetch");
const date = require('date-and-time');
const { cpf } = require('cpf-cnpj-validator');

require('dotenv').config()


module.exports = class GovController {
    static async auxilioBrasilMunicipio(req, res) {

        let { estados, municipios, result, mensagem } = '';
        let mes = req.query.mes;
        const { estado, municipio } = req.query;

        if (estado && !municipio) {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios?orderBy=nome`);
            municipios = await response.json();
        }
        else if (estado && municipio) {
            if (!mes) {
                req.flash('message', 'Selecione um mês!');

                res.redirect(`?estado=${estado}`);

                return;
            }
            else {
                mes = mes.replace('-', '');
                const headers = {
                    'chave-api-dados': process.env.CHAVE_API_DADOS
                };

                const response = await fetch(`http://api.portaldatransparencia.gov.br/api-de-dados/auxilio-brasil-por-municipio?codigoIbge=${municipio}&pagina=1&mesAno=${mes}`, { headers: headers });
                result = await response.json();

                if (result == "") {

                    mensagem = "Ainda não há dados disponíveis para o mês informado!";

                } else {

                    let data = new Date(result[0].dataReferencia);
                    data.setDate(data.getDate() + 1);

                    result[0].dataReferencia = date.format(data, "DD/MM/YYYY");

                    result[0].valor = result[0].valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.', ',').replace(',', '.');

                }

            }
        }
        else {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`);
            estados = await response.json();
        }
        res.render('gov/auxilioBrasil', { estados, estado, municipios, result, mensagem });
    }

    static async auxilioEmergencialCPF(req, res) {
        const { buscaCpf } = req.query;
        let { result } = '';

        if (buscaCpf && !(cpf.isValid(buscaCpf))) {
            req.flash('message', 'CPF inválido, digite novamente!');

            res.render('gov/auxilioEmergencial');

            return;
        }
        else {
            const headers = {
                'chave-api-dados': process.env.CHAVE_API_DADOS
            };

            const response = await fetch(`http://api.portaldatransparencia.gov.br/api-de-dados/auxilio-emergencial-por-cpf-ou-nis?pagina=1&codigoBeneficiario=${buscaCpf}&codigoResponsavelFamiliar=${buscaCpf}`, { headers: headers });
            result = await response.json();

            if(result == "" && buscaCpf){
                req.flash('message', 'Não há Benefício para o CPF digitado');

                res.render('gov/auxilioEmergencial');
    
                return;
            }

            for (let i = 0; i < result.length; i++) {
                result[i].numeroParcela = parseInt(result[i].numeroParcela.replace('ª', ''));
            }

            result.sort(function (a, b) {
                if (a.numeroParcela < b.numeroParcela) return -1;
                if (a.numeroParcela > b.numeroParcela) return 1;
                return 0;
            });

            //  console.log(result);

        }



        res.render('gov/auxilioEmergencial', { result });
    }

};