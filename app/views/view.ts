export class View<Typo> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    template(modelo: Typo): string {
        throw Error("Classe filha precisa modificar o conteúdo de dentro do método 'template'");
    }

    atualiza(modelo: Typo): void {
        const template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
