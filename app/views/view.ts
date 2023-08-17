export class View<Type> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    template(modelo: Type): string {
        throw Error("Classe filha precisa implementar o método template");
    }

    atualiza(modelo: Type): void {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
