export abstract class View<Type> {
    protected elemento: HTMLElement;
    private escapeScripts: boolean = false;

    constructor(seletor: string, escapeScripts?: boolean) {
        this.elemento = document.querySelector(seletor);
        if(escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }

    protected abstract template(modelo: Type): string;

    public atualiza(modelo: Type): void {
        let template = this.template(modelo);
        if(this.escapeScripts) {
            template = template.replace(/<script>[\s\S*?]<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}
