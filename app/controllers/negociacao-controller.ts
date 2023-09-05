import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.atualiza(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao();
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.atualiza("Negociações podem ser adiconadas somente em dias utéis!")

            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.limpaForm();
        this.atualizaView();
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private criaNegociacao(): Negociacao {
        const expRegex = /-/g;
        const date = new Date(this.inputData.value.replace(expRegex, ","));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }

    private limpaForm(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.atualiza(this.negociacoes);
        this.mensagemView.atualiza("Negociação feita com sucesso!!");
    }
}