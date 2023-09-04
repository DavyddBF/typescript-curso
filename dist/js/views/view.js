export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    atualiza(modelo) {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
