export function logarTempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...argumentos) {
            const t1 = performance.now();
            const retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / 1000}`);
            retornoDoMetodo;
        };
        return descriptor;
    };
}
