export function logarTempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...argumentos) {
            let divisor = 1;
            let unidadeDeTempo = "milisegundo";
            if (emSegundos) {
                divisor = 1000;
                unidadeDeTempo = "segundos";
            }
            const t1 = performance.now();
            const retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidadeDeTempo}`);
            retornoDoMetodo;
        };
        return descriptor;
    };
}
