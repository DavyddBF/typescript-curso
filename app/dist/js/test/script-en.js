class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    static createNegotiation(stringDate, stringQuantity, stringValue) {
        const [year, month, day] = stringDate
            .split("-")
            .map(Number);
        const date = new Date(year, month - 1, day);
        const quantity = parseInt(stringQuantity, 10);
        const value = parseFloat(stringValue);
        return new Negotiation(date, quantity, value);
    }
    get date() {
        return new Date(this._date.getTime());
    }
    get volume() {
        return this.quantity * this.value;
    }
    get allInfo() {
        return `Date: ${this.date}, Quantity: ${this.quantity}, Value: ${this.value}, Volume: ${this.volume}`;
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
    constructor(selectorElement, escapeScripts) {
        this.escapeScripts = false;
        const element = document.querySelector(selectorElement);
        if (element) {
            this.elementDOM = element;
        }
        else {
            throw new Error(`Selector ${selectorElement} does not exist in the DOM. Check the code!`);
        }
        if (escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }
    updateScreen(model) {
        let template = this.template(model);
        if (this.escapeScripts) {
            template = template.replace(/<script>[\s\S]*?<\/script>/gi, "");
        }
        this.elementDOM.innerHTML = template;
    }
}
class NegotiationView extends View {
    template(model) {
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
    formatDate(date) {
        return new Intl.DateTimeFormat().format(date);
    }
}
class MessageView extends View {
    template(model) {
        return `
            <p class="alert alert-info">
                ${model}
            </p>
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
        this.messageView = new MessageView("#mensagemView");
        this.inputDate =
            document.querySelector("#data");
        this.inputQuantity =
            document.querySelector("#quantidade");
        this.inputValue =
            document.querySelector("#valor");
        this.negotiationsView.updateScreen(this.negotiations);
    }
    addNegotiation() {
        const negotiation = Negotiation.createNegotiation(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.isBusinessDay(negotiation.date)) {
            this.messageView.updateScreen("Negotiations can only be added on business days!");
            return;
        }
        this.negotiations.add(negotiation);
        this.clearForm();
        this.updateView();
    }
    isBusinessDay(date) {
        return (date.getDay() > DaysOfWeek.SUNDAY &&
            date.getDay() < DaysOfWeek.SATURDAY);
    }
    clearForm() {
        this.inputDate.value = "";
        this.inputQuantity.value = "";
        this.inputValue.value = "";
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.updateScreen(this.negotiations);
        this.messageView.updateScreen("Negotiation successfully added!");
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
    throw new Error("Negotiation could not be initialized because the form was not found in the DOM.");
}
