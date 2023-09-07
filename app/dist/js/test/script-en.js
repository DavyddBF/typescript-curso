class Negotiation {
    constructor(_date, quantify, value) {
        this._date = _date;
        this.quantify = quantify;
        this.value = value;
    }
    static createNegotiation(stringDate, stringQuantify, stringValue) {
        const regex = /-/g;
        const date = new Date(stringDate.replace(regex, ","));
        const quantify = parseInt(stringQuantify);
        const value = parseFloat(stringValue);
        return new Negotiation(date, quantify, value);
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    get volume() {
        return this.quantify * this.value;
    }
    get allInfos() {
        return `Date: ${this.date}, Quantify: ${this.quantify}, Value: ${this.value}, Volume: ${this.volume}`;
    }
}
class Negotiations {
    constructor() {
        this.negotiations = [];
    }
    add(negotiation) {
        this.negotiations.push(negotiation);
    }
    list() {
        return this.negotiations;
    }
}
class View {
    constructor(selectElement, escapeOfScript) {
        this.escapeOfScript = false;
        const element = document.querySelector(selectElement);
        if (element)
            this.elementDOM = element;
        else
            throw Error(`Seletor ${selectElement} não existe no DOM. Verifique o código!!`);
        if (escapeOfScript)
            this.escapeOfScript = escapeOfScript;
    }
    updateScreen(model) {
        let template = this.template(model);
        if (this.escapeOfScript)
            template = template.replace(/<script>[\s\S]?*<\/script>/, "");
        this.elementDOM.innerHTML = template;
    }
}
class NegotiationView extends View {
    template(model) {
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
                    `;
        }).join("")}
                </tbody>
            </table>
        `;
    }
    formatDate(date) {
        return new Intl.DateTimeFormat().format(date);
    }
}
class MensageView extends View {
    template(model) {
        return `
            <p class=" alert alert-info">${model}</p>
        `;
    }
}
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek[DaysOfWeek["SUNDAY"] = 0] = "SUNDAY";
    DaysOfWeek[DaysOfWeek["MONDAY"] = 1] = "MONDAY";
    DaysOfWeek[DaysOfWeek["TUESDAY"] = 2] = "TUESDAY";
    DaysOfWeek[DaysOfWeek["WEDNESDAY"] = 3] = "WEDNESDAY";
    DaysOfWeek[DaysOfWeek["THURSDAY"] = 4] = "THURSDAY";
    DaysOfWeek[DaysOfWeek["FRIDAY"] = 5] = "FRIDAY";
    DaysOfWeek[DaysOfWeek["SATURDAY"] = 6] = "SATURDAY";
})(DaysOfWeek || (DaysOfWeek = {}));
class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationView("#negociacoesView");
        this.mensageView = new MensageView("#mensagemView");
        this.inputDate = document.querySelector("#data");
        this.inputQuantify = document.querySelector("#quantidade");
        this.inputValue = document.querySelector("#valor");
        this.negotiationsView.updateScreen(this.negotiations);
    }
    addNegotiation() {
        const negotiation = Negotiation.createNegotiation(this.inputDate.value, this.inputQuantify.value, this.inputValue.value);
        if (!this.isBusinessDay(negotiation.date)) {
            this.mensageView.updateScreen("Negociações podem ser adiconadas somente em dias utéis!");
            return;
        }
        this.negotiations.add(negotiation);
        this.clearForm();
        this.updateView();
    }
    isBusinessDay(date) {
        return date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY;
    }
    clearForm() {
        this.inputDate.value = "";
        this.inputQuantify.value = "";
        this.inputValue.value = "";
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.updateScreen(this.negotiations);
        this.mensageView.updateScreen("Negociação feita com sucesso!");
    }
}
const controller = new NegotiationController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.addNegotiation();
    });
}
else {
    throw Error("Negociação não pôde ser inicializada devido erro no form. Possivelmente retornou 'null'");
}
