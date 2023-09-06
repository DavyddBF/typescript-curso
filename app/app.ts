import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controle = new NegociacaoController();
const formulario = document.querySelector(".form");

if(formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        controle.adiciona();
    }) 
} else {
    throw Error("Negociação não pôde ser inicializada devido erro no form. Possivelmente retornou 'null'");
}