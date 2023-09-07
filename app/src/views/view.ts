export abstract class View<Type> {
    protected elemento: HTMLElement;
    private escapeScripts: boolean = false;

    constructor(seletor: string, escapeScripts?: boolean) {
        const elemento = document.querySelector(seletor);
        if(elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique o código!!`);
        }

        if(escapeScripts) {
            this.escapeScripts = escapeScripts;
        }
    }

    protected abstract template(modelo: Type): string;

    public atualiza(modelo: Type): void {
        let template = this.template(modelo);
        if(this.escapeScripts) {
            template = template.replace(/<script>[\s\S]?*<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}
