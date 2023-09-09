import { escapeDeScripts } from "../decorators/escapeDeScript.js";
import { inspecionar } from "../decorators/inspecionar.js";
import { logarTempoDeExecucao } from "../decorators/logTemp.js";

export abstract class View<Type> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if(elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique o código!!`);
        }
    }
    
    // @logarTempoDeExecucao()
    // @inspecionar()
    public atualiza(modelo: Type): void {
        let template = this.template(modelo);
       
        this.elemento.innerHTML = template;
    }

    protected abstract template(modelo: Type): string;
}
