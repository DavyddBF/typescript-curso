export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique o código!!`);
        }
    }
    atualiza(modelo) {
        let template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
