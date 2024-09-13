export default function importAllLocalFunctions(){
    const context = require.context('./', false, /\.js$/);

    // Crea un objeto con todas las funciones
    const functions = context.keys().reduce((acc, key) => {
        const functionName = key.replace('./', '').replace('.js', '');
        acc[functionName] = context(key).default;
        return acc;
    }, {});

    return functions
}


