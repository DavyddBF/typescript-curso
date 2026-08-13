// Complete code in a single file.
// This code is not being called anywhere yet.

/*
    This code, unlike the code in Portuguese,
    is written in English.

    Although I speak Portuguese, I wanted to
    write a code in English as well!
*/

class Negotiation {

    constructor(
        private _date: Date,
        public readonly quantity: number,
        public readonly value: number
    ) {}

    public static createNegotiation(
        stringDate: string,
        stringQuantity: string,
        stringValue: string
    ): Negotiation {

        const [year, month, day] = stringDate
            .split("-")
            .map(Number);

        const date = new Date(year, month - 1, day);

        const quantity = parseInt(stringQuantity, 10);
        const value = parseFloat(stringValue);

        return new Negotiation(date, quantity, value);
    }

    get date(): Date {
        return new Date(this._date.getTime());
    }

    get volume(): number {
        return this.quantity * this.value;
    }

    get allInfo(): string {
        return `Date: ${this.date}, Quantity: ${this.quantity}, Value: ${this.value}, Volume: ${this.volume}`;
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
    private escapeScripts: boolean = false;

    constructor(
        selectorElement: string,
        escapeScripts?: boolean
    ) {

        const element = document.querySelector(selectorElement);

        if (element) {
            this.elementDOM = element as HTMLElement;
        } else {
            throw new Error(
                `Selector ${selectorElement} does not exist in the DOM. Check the code!`
            );
        }

        if (escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }

    protected abstract template(model: Type): string;

    public updateScreen(model: Type): void {

        let template = this.template(model);

        if (this.escapeScripts) {
            template = template.replace(
                /<script>[\s\S]*?<\/script>/gi,
                ""
            );
        }

        this.elementDOM.innerHTML = template;
    }
}


class NegotiationView extends View<Negotiations> {

    protected template(model: Negotiations): string {

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>QUANTITY</th>
                        <th>VALUE</th>
                    </tr>
                </thead>

                <tbody>
                    ${model.list().map(negotiation => {
                        return `
                            <tr>
                                <td>
                                    ${this.formatDate(negotiation.date)}
                                </td>

                                <td>
                                    ${negotiation.quantity}
                                </td>

                                <td>
                                    ${negotiation.value}
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        `;
    }

    private formatDate(date: Date): string {
        return new Intl.DateTimeFormat().format(date);
    }
}


class MessageView extends View<string> {

    protected template(model: string): string {

        return `
            <p class="alert alert-info">
                ${model}
            </p>
        `;
    }
}


enum DaysOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
}


class NegotiationController {

    private inputDate: HTMLInputElement;
    private inputQuantity: HTMLInputElement;
    private inputValue: HTMLInputElement;

    private negotiations = new Negotiations();

    private negotiationsView = new NegotiationView(
        "#negociacoesView"
    );

    private messageView = new MessageView(
        "#mensagemView"
    );

    constructor() {

        this.inputDate =
            document.querySelector("#data") as HTMLInputElement;

        this.inputQuantity =
            document.querySelector("#quantidade") as HTMLInputElement;

        this.inputValue =
            document.querySelector("#valor") as HTMLInputElement;

        this.negotiationsView.updateScreen(
            this.negotiations
        );
    }

    public addNegotiation(): void {

        const negotiation =
            Negotiation.createNegotiation(
                this.inputDate.value,
                this.inputQuantity.value,
                this.inputValue.value
            );

        if (!this.isBusinessDay(negotiation.date)) {

            this.messageView.updateScreen(
                "Negotiations can only be added on business days!"
            );

            return;
        }

        this.negotiations.add(negotiation);

        this.clearForm();

        this.updateView();
    }

    private isBusinessDay(date: Date): boolean {

        return (
            date.getDay() > DaysOfWeek.SUNDAY &&
            date.getDay() < DaysOfWeek.SATURDAY
        );
    }

    private clearForm(): void {

        this.inputDate.value = "";
        this.inputQuantity.value = "";
        this.inputValue.value = "";

        this.inputDate.focus();
    }

    private updateView(): void {

        this.negotiationsView.updateScreen(
            this.negotiations
        );

        this.messageView.updateScreen(
            "Negotiation successfully added!"
        );
    }
}


const controller = new NegotiationController();

const form = document.querySelector(".form");

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        controller.addNegotiation();
    });

} else {

    throw new Error(
        "Negotiation could not be initialized because the form was not found in the DOM."
    );
}