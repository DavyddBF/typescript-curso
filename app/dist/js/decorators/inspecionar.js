export function inspecionar() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...argumentos) {
            console.log(`--- Método: ${propertyKey}`);
            console.log(`------ parâmetros: ${JSON.stringify(argumentos)}`);
            const retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            console.log(`------ retorno: ${JSON.stringify(retornoDoMetodo)}`);
            return retornoDoMetodo;
        };
        return descriptor;
    };
}
