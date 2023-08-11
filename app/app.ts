import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controle = new NegociacaoController();
const formulario = document.querySelector(".form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    controle.adiciona();
});

console.log("oi");