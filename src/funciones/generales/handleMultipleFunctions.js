export default function  HandleMultipleFunctions (...functions) {
    return (event) => {
        functions.forEach((func) => {
            if (typeof func === 'function') {
                func(event);
            }
        });
    };
};