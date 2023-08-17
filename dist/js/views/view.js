export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    template(modelo) {
        throw Error("Classe filha precisa implementar o método template");
    }
    atualiza(modelo) {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
