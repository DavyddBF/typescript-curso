export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    template(modelo) {
        throw Error("Classe filha precisa modificar o conteúdo de dentro do método 'template'");
    }
    atualiza(modelo) {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
