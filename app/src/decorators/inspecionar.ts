export function inspecionar() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...argumentos: any) {
            console.log(`--- Método: ${propertyKey}`);
            console.log(`------ parâmetros: ${JSON.stringify(argumentos)}`);
            const retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            console.log(`------ retorno: ${JSON.stringify(retornoDoMetodo)}`);
            return retornoDoMetodo;
        }

        return descriptor;
    }   
}