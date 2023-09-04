export abstract class View<Type> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    abstract template(modelo: Type): string;

    atualiza(modelo: Type): void {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
