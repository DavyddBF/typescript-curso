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

   
    public static createNegotiation(stringDate: string, stringQuantify: string, stringValue: string): Negotiation {
        const regex = /-/g;
        const date = new Date(stringDate.replace(regex, ","));
        const quantify = parseInt(stringQuantify);
        const value = parseFloat(stringValue);
        return new Negotiation(date, quantify, value);
    }

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

    public add(negotiation: Negotiation): void {
        this.negotiations.push(negotiation);
    }

    public list(): ReadonlyArray<Negotiation> {
        return this.negotiations;
    }
}

abstract class View<Type> {
    protected elementDOM: HTMLElement;
    private escapeOfScript: boolean = false;

    constructor(selectElement: string, escapeOfScript?: boolean) {
        const element = document.querySelector(selectElement);
        if(element) this.elementDOM = element as HTMLElement;
        else throw Error(`Seletor ${selectElement} não existe no DOM. Verifique o código!!`);

        if(escapeOfScript) this.escapeOfScript = escapeOfScript;
    }

    protected abstract template(model: Type): string;

    public updateScreen(model: Type) {
        let template = this.template(model);
        if(this.escapeOfScript) template = template.replace(/<script>[\s\S]?*<\/script>/, "")
        this.elementDOM.innerHTML = template;
    }
 }

class NegotiationView extends View<Negotiations> {
    
    protected template(model: Negotiations): string {
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
                                ${this.formatDate(negotiation.date)}
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

    private formatDate(date: Date): string {
        return new Intl.DateTimeFormat().format(date)
    }
}

class MensageView extends View<string> {
    protected template(model: string): string {
        return `
            <p class=" alert alert-info">${model}</p>
        `;
    }
}

enum DaysOfWeek {
    SUNDAY    = 0,
    MONDAY    = 1,
    TUESDAY   = 2,
    WEDNESDAY = 3,
    THURSDAY  = 4,
    FRIDAY    = 5,
    SATURDAY  = 6
}

class NegotiationController {
    private inputDate: HTMLInputElement;
    private inputQuantify: HTMLInputElement;
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationView("#negociacoesView");
    private mensageView = new MensageView("#mensagemView");

    constructor() {
        this.inputDate = document.querySelector("#data") as HTMLInputElement;
        this.inputQuantify = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValue = document.querySelector("#valor") as HTMLInputElement;
        this.negotiationsView.updateScreen(this.negotiations);
    }

    addNegotiation(): void {
        const negotiation = Negotiation.createNegotiation(
            this.inputDate.value,
            this.inputQuantify.value,
            this.inputValue.value
        );

        if(!this.isBusinessDay(negotiation.date)) {
            this.mensageView.updateScreen("Negociações podem ser adiconadas somente em dias utéis!")
            return;
        }

        this.negotiations.add(negotiation);
        this.clearForm();
        this.updateView();
    }

    private isBusinessDay(date: Date): boolean {
        return date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY;
    }

    private clearForm(): void {
        this.inputDate.value = "";
        this.inputQuantify.value = "";
        this.inputValue.value = "";
        this.inputDate.focus();
    }

    private updateView(): void {
        this.negotiationsView.updateScreen(this.negotiations);
        this.mensageView.updateScreen("Negociação feita com sucesso!");
    }
}

const controller = new NegotiationController();
const form = document.querySelector(".form");

if(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.addNegotiation();
    });
} else {
    throw Error("Negociação não pôde ser inicializada devido erro no form. Possivelmente retornou 'null'")
}
