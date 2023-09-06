class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    static criaNegociacao(stringData, stringQuantidade, stringValor) {
        const regex = /-/g;
        const data = new Date(stringData.replace(regex, ","));
        const quantidade = parseInt(stringQuantidade);
        const valor = parseFloat(stringValor);
        return new Negociacao(data, quantidade, valor);
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get todos() {
        return `Data: ${this.data}, Quantidade: ${this.quantidade}, Valor: ${this.valor}, Volume:${this.volume}`;
    }
}
class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
class Visualizacao {
    constructor(seletorElemento, escapeDeScripts) {
        this.escapeDeScripts = false;
        const elemento = document.querySelector(seletorElemento);
        if (elemento) {
            this.elementoDOM = elemento;
        }
        else {
            throw Error(`Seletor ${seletorElemento} não existe no DOM. Verifique o código!!`);
        }
        if (escapeDeScripts) {
            this.escapeDeScripts = escapeDeScripts;
        }
    }
    atualizaTela(modelo) {
        let template = this.template(modelo);
        if (this.escapeDeScripts) {
            template = template.replace(/<script>[\s\S]?*<\/script>/, "");
        }
        this.elementoDOM.innerHTML = template;
    }
}
class NegociacoesView extends Visualizacao {
    template(modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </thead>
                <tbody>
                ${modelo.lista().map(negociacao => {
            return `
                        <tr>
                            <td>
                                ${this.formataData(negociacao.data)}
                            </td>
                            <td>
                                ${negociacao.quantidade}
                            </td>
                            <td>
                                ${negociacao.valor}
                            </td>
                        </tr>
                    `;
        }).join("")}
                </tbody>
            </table>
        `;
    }
    formataData(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
class MensagemView extends Visualizacao {
    template(modelo) {
        return `
            <p class=" alert alert-info">${modelo}</p>
        `;
    }
}
var DiasDaSemana;
(function (DiasDaSemana) {
    DiasDaSemana[DiasDaSemana["DOMINGO"] = 0] = "DOMINGO";
    DiasDaSemana[DiasDaSemana["SEGUNDA"] = 1] = "SEGUNDA";
    DiasDaSemana[DiasDaSemana["TERCA"] = 2] = "TERCA";
    DiasDaSemana[DiasDaSemana["QUARTA"] = 3] = "QUARTA";
    DiasDaSemana[DiasDaSemana["QUINTA"] = 4] = "QUINTA";
    DiasDaSemana[DiasDaSemana["SEXTA"] = 5] = "SEXTA";
    DiasDaSemana[DiasDaSemana["SABADO"] = 6] = "SABADO";
})(DiasDaSemana || (DiasDaSemana = {}));
class NegociacaoControle {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.atualizaTela(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaNegociacao(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.atualizaTela("Negociações podem ser adiconadas somente em dias utéis!");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
    limpaFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.atualizaTela(this.negociacoes);
        this.mensagemView.atualizaTela("Negociação feita com sucesso!");
    }
}
const controle = new NegociacaoControle();
const formulario = document.querySelector(".form");
if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        controle.adiciona();
    });
}
else {
    throw Error("Negociação não pôde ser inicializada devido erro no form. Possivelmente retornou 'null'");
}
