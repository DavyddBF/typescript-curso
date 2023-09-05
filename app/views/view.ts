export abstract class View<Type> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    protected abstract template(modelo: Type): string;

    public atualiza(modelo: Type): void {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
