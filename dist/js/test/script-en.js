// Complete code in a single file. Here I did to recreate the code.
// Not being called anywhere.
/* This code, unlike the code in pt-br, will be in English. Although I speak Portuguese
   I wanted to write a code in English too!

   Esse código, diferente do código em pt-br, vai estar em ingles. Apesar que eu falo português
   eu queria escrever um código em inglês também!
*/
class Negotiation {
    constructor(date, quantify, value) {
        this._date = date;
        this._quantify = quantify;
        this._value = value;
    }
    get date() {
        return this._date;
    }
    get quantify() {
        return this._quantify;
    }
    get value() {
        return this._value;
    }
    get volume() {
        return this._quantify * this._value;
    }
    get allInfos() {
        return `Date: ${this.date}, Quantify: ${this.quantify}, Value: ${this.value}, Volume: ${this.volume}`;
    }
}
class NegotiationController {
    constructor() {
        this.date = document.querySelector("#data");
        this.quantify = document.querySelector("#quantidade");
        this.value = document.querySelector("#valor");
    }
    addNegotiation() {
        const negotiation = this.createNegotiation();
        console.log(negotiation.allInfos);
        this.clearForm();
    }
    createNegotiation() {
        const regex = /-/g;
        const date = new Date(this.date.value.replace(regex, ","));
        const quantify = parseInt(this.quantify.value);
        const value = parseFloat(this.value.value);
        return new Negotiation(date, quantify, value);
    }
    clearForm() {
        this.date.value = "";
        this.quantify.value = "";
        this.value.value = "";
        this.date.focus();
    }
}
const controller = new NegotiationController();
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.addNegotiation();
});
