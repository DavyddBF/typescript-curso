// Esqueleto de um decorator:
/*
export function logarTempoDeExecucao() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        return descriptor;
    }
}
*/

export function logarTempoDeExecucao() {
    return function(
        target: any, // Se o método for estático de uma classe pode ser uma função contrutora. Se não for estático vai ser o prototype
        propertyKey: string, // Trás o nome do método
        descriptor: PropertyDescriptor // Sabe tudo sobre o método que queremos modificar
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...argumentos: Array<any>) {
            const t1 = performance.now();
            const retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / 1000}`);
            retornoDoMetodo;
        }

        return descriptor;
    }
}