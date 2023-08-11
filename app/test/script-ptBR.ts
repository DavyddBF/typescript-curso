// Código completo num arquivo só. Aqui fiz para recriar o código.
// Não está sendo chamado em nenhum lugar.

class Negociacao {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get todos(): string {
        return `Data: ${this.data}, Quantidade: ${this.quantidade}, Valor: ${this.valor}, Volume:${this.volume}`
    }
}

class Negociacoes {
    private negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }
}

class View<Type> {
    protected elementoDOM: HTMLElement;
    
    constructor(seletorElemento: string) {
        this.elementoDOM = document.querySelector(seletorElemento);
    }

    template(modelo: Type): string {
        throw Error("Classe filha precisa modificar o conteúdo de dentro do método 'template");
    }

    atualizaTela(modelo: Type): void {
        this.elementoDOM.innerHTML = this.template(modelo);
    }
}

class NegociacoesView extends View<Negociacoes> {

    template(modelo: Negociacoes): string {
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
                    `
                }).join("")}
                </tbody>
            </table>
        `;
    }
}

class MensagemView extends View<string> {

    template(modelo: string): string {
        return `
            <p class=" alert alert-info">${modelo}</p>
        `;
    }
}

class NegociacaoControle {
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
        this.negociacoesView.atualizaTela(this.negociacoes);
    }

    adiciona(): void {
        const negociacao = this.criaNegociacao();
        this.negociacoes.adiciona(negociacao);
        this.negociacoesView.atualizaTela(this.negociacoes);
        this.mensagemView.atualizaTela("Negociação feita com sucesso!");
        this.limpaFormulario();
    }

    criaNegociacao(): Negociacao {
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