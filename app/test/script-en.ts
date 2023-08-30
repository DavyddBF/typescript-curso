// Complete code in a single file. Here I did to recreate the code.
// Not being called anywhere.
/* This code, unlike the code in pt-br, will be in English. Although I speak Portuguese 
   I wanted to write a code in English too!

   Esse código, diferente do código em pt-br, vai estar em ingles. Apesar que eu falo português
   eu queria escrever um código em inglês também!
*/

class Negotiation {
   constructor(
        private _date: Date,
        public readonly quantify: number,
        public readonly value: number
   ) {}

    get date(): Date {
        const date = new Date(this._date.getTime());
        return date;
    }
    
    get volume(): number {
        return this.quantify * this.value;
    }

    get allInfos(): string {
        return `Date: ${this.date}, Quantify: ${this.quantify}, Value: ${this.value}, Volume: ${this.volume}`;
    }
}

class Negotiations {
    private negotiations: Array<Negotiation> = [];

    add(negotiation: Negotiation): void {
        this.negotiations.push(negotiation);
    }

    list(): ReadonlyArray<Negotiation> {
        return this.negotiations;
    }
}

 class View<Type> {
    protected elementDOM: HTMLElement;

    constructor(selectElement: string) {
        this.elementDOM = document.querySelector(selectElement);
    }

    template(model: Type): string {
        throw Error("Child class needs to modify content from inside 'template' method")
    }

    updateScreen(model: Type) {
        this.elementDOM.innerHTML = this.template(model);
    }
 }

class NegotiationView extends View<Negotiations> {
    
    template(model: Negotiations): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
            </thead>
            <tbody>
            ${model.list().map(negotiation => {
                return `
                    <tr>
                        <td>
                            ${new Intl.DateTimeFormat().format(negotiation.date)}
                        </td>
                        <td>
                            ${negotiation.quantify}
                        </td>
                        <td>
                            ${negotiation.value}
                        </td>
                    </tr>
                `
            }).join("")}
            </tbody>
        </table>
    `;
    }
}

class MensageView extends View<string> {
    template(model: string): string {
        return `
            <p class=" alert alert-info">${model}</p>
        `;
    }
}

class NegotiationController {
    private inputDate: HTMLInputElement;
    private inputQuantify: HTMLInputElement;
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationView("#negociacoesView");
    private mensageView = new MensageView("#mensagemView");

    constructor() {
        this.inputDate = document.querySelector("#data");
        this.inputQuantify = document.querySelector("#quantidade");
        this.inputValue = document.querySelector("#valor");
        this.negotiationsView.updateScreen(this.negotiations);
    }

    addNegotiation(): void {
        const negotiation = this.createNegotiation();
        this.negotiations.add(negotiation);
        this.negotiationsView.updateScreen(this.negotiations);
        this.mensageView.updateScreen("Negociação feita com sucesso!")
        this.clearForm();
    }

    createNegotiation(): Negotiation {
        const regex = /-/g;
        const date = new Date(this.inputDate.value.replace(regex, ","));
        const quantify = parseInt(this.inputQuantify.value);
        const value = parseFloat(this.inputValue.value);
        return new Negotiation(date, quantify, value);
    }

    clearForm(): void {
        this.inputDate.value = "";
        this.inputQuantify.value = "";
        this.inputValue.value = "";
        this.inputDate.focus();
    }
}

const controller = new NegotiationController();
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.addNegotiation();
});