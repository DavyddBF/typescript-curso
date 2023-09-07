import { View } from "./view.js";

export class MensagemView extends View<string> {

    protected template(modelo: string): string {
        return `
            <p class="alert alert-info">${modelo}</p>
        `;
    }
}
