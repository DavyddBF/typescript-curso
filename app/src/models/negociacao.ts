/*
    Classe Negociação que é exportada para ser usada em ../app.ts
    Classe é o exato modelo da negociação, onde seus valores apenas podem entrar, mas não sair (Não pode ser removido nem modificado)
    
*/

export class Negociacao {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}
    
    public static criaNegociacao(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const expRegex = /-/g;
        const date = new Date(dataString.replace(expRegex, ","));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get todos(): string {
        return `Data: ${this.data}, Quantidade: ${this.quantidade}, Valor: ${this.valor}, Volume:${this.volume}`
    }
}