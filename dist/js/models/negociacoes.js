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
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
