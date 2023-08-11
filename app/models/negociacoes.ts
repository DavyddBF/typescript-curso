import { Negociacao } from "./negociacao.js";

// export class Negociacoes {
//     //private negociacoes: Array<Negociacao> = [];
//     private negociacoes: Negociacao[] = [];
    
//     adiciona(negociacao: Negociacao): void {
//         this.negociacoes.push(negociacao);
//     }

//     lista(): readonly Negociacao[] {
//         return this.negociacoes;
//     }
// }

export class Negociacoes {
    private negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }
}