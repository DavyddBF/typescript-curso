class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
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
    constructor(seletorElemento) {
        this.elementoDOM = document.querySelector(seletorElemento);
    }
    template(modelo) {
        throw Error("Classe filha precisa modificar o conteúdo de dentro do método 'template'");
    }
    atualizaTela(modelo) {
        this.elementoDOM.innerHTML = this.template(modelo);
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
                                ${new Intl.DateTimeFormat().format(negociacao.data)}
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
}
class MensagemView extends Visualizacao {
    template(modelo) {
        return `
            <p class=" alert alert-info">${modelo}</p>
        `;
    }
}
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
        const negociacao = this.criaNegociacao();
        this.negociacoes.adiciona(negociacao);
        this.negociacoesView.atualizaTela(this.negociacoes);
        this.mensagemView.atualizaTela("Negociação feita com sucesso!");
        this.limpaFormulario();
    }
    criaNegociacao() {
        const regex = /-/g;
        const data = new Date(this.inputData.value.replace(regex, ","));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(data, quantidade, valor);
    }
    limpaFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
}
const controle = new NegociacaoControle();
const formulario = document.querySelector(".form");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    controle.adiciona();
});
