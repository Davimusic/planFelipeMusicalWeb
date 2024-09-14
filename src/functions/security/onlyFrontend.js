export default function onlyFrontend(func) {
    if (typeof window !== 'undefined') {
        return func();
    } else {
        return console.log('No se puede usar alert en el servidor');
    }
}
