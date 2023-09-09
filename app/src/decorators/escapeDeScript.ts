export function escapeDeScripts() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...argumentos: any[]) {
            let retornoDoMetodo = metodoOriginal.apply(this, argumentos);
            console.log(retornoDoMetodo);
            console.log(metodoOriginal)

            if(typeof retornoDoMetodo === "string") {
                //console.log(`@escapeDeScript em ação na classe ${this.constructor.name} no método ${propertyKey}`)
                retornoDoMetodo.replace(/<script>[\s\S]*?<\/script>/, "");
            }
            return retornoDoMetodo;
        }

        return descriptor;
    }
}