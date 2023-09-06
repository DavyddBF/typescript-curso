export class View {
    constructor(seletor, escapeScripts) {
        this.escapeScripts = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique o código!!`);
        }
        if (escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }
    atualiza(modelo) {
        let template = this.template(modelo);
        if (this.escapeScripts) {
            template = template.replace(/<script>[\s\S]?*<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}
