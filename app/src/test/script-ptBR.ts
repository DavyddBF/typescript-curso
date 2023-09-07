// Código completo num arquivo só. Aqui fiz para recriar o código.
// Não está sendo chamado em nenhum lugar.

class Negociacao {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    
    public static criaNegociacao(stringData: string, stringQuantidade: string, stringValor: string): Negociacao {
        const regex = /-/g;
        const data = new Date(stringData.replace(regex, ","));
        const quantidade = parseInt(stringQuantidade);
        const valor = parseFloat(stringValor);
        return new Negociacao(data, quantidade, valor);
    }

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

    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    public lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }
}

abstract class Visualizacao<Tipo> {
    protected elementoDOM: HTMLElement;
    private escapeDeScripts: boolean = false;
    
    constructor(seletorElemento: string, escapeDeScripts?: boolean) {
        const elemento = document.querySelector(seletorElemento);
        if(elemento) {
            this.elementoDOM = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletorElemento} não existe no DOM. Verifique o código!!`);
        }

        if(escapeDeScripts) {
            this.escapeDeScripts = escapeDeScripts;
        }
    }

    protected abstract template(modelo: Tipo): string;

    public atualizaTela(modelo: Tipo): void {
        let template = this.template(modelo);
        if(this.escapeDeScripts) {
            template = template.replace(/<script>[\s\S]?*<\/script>/, "")
        }
        this.elementoDOM.innerHTML = template;
    }
}

class NegociacoesView extends Visualizacao<Negociacoes> {

    protected template(modelo: Negociacoes): string {
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
                    `
                }).join("")}
                </tbody>
            </table>
        `;
    }

    private formataData(data: Date): string {
        return new Intl.DateTimeFormat().format(data);
    }
}

class MensagemView extends Visualizacao<string> {

    protected template(modelo: string): string {
        return `
            <p class=" alert alert-info">${modelo}</p>
        `;
    }
}

enum DiasDaSemana {
    DOMINGO = 0,
    SEGUNDA = 1,
    TERCA   = 2,
    QUARTA  = 3,
    QUINTA  = 4,
    SEXTA   = 5,
    SABADO  = 6
}

class NegociacaoControle {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this.inputData = document.querySelector("#data") as HTMLInputElement;
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.atualizaTela(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.atualizaTela("Negociações podem ser adiconadas somente em dias utéis!");
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limpaFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.atualizaTela(this.negociacoes);
        this.mensagemView.atualizaTela("Negociação feita com sucesso!");
    }
}

const controle = new NegociacaoControle();
const formulario = document.querySelector(".form");

if(formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        controle.adiciona();
    });
} else {
    throw Error("Negociação não pôde ser inicializada devido erro no form. Possivelmente retornou 'null'")
}
