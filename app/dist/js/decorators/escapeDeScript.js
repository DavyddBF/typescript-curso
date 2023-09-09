export function escapeDeScripts() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...argumentos) {
            let retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            console.log(retornoDoMetodo);
            console.log(metodoOriginal);
            if (typeof retornoDoMetodo === "string") {
                retornoDoMetodo.replace(/<script>[\s\S]*?<\/script>/, "");
            }
            return retornoDoMetodo;
        };
        return descriptor;
    };
}
