import { View } from "./view.js";
export class MensagemView extends View {
    template(modelo) {
        return `
            <p class="alert alert-info">${modelo}</p>
        `;
    }
}
