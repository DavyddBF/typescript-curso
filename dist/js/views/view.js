export class View {
    constructor(seletor, escapeScripts) {
        this.escapeScripts = false;
        this.elemento = document.querySelector(seletor);
        if (escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }
    atualiza(modelo) {
        let template = this.template(modelo);
        if (this.escapeScripts) {
            template = template.replace(/<script>[\s\S*?]<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}
