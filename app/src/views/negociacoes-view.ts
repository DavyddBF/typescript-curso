import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {

    protected template(modelo: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </thead>
                <tbody>
                    ${modelo.lista().map(negociacao => {
                        return `
                            <tr>
                                <td>
                                    ${this.formataData(negociacao.data)}
                                </td>
                                <td>
                                    ${negociacao.quantidade}
                                </td>
                                <td>
                                    ${negociacao.valor}
                                </td>
                            </tr>
                        `
                        }).join("")}
                </tbody>
            </table>
        `;
    }

    private formataData(data: Date): string {
        return new Intl.DateTimeFormat().format(data)
    }
}