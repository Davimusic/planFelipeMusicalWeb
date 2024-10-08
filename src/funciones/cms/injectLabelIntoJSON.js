export default function injectLabelIntoJSON(json, items) {
    //console.log(json);
    // Función recursiva para buscar el elemento con id = "ChildrenArray"
    function findAndInject(node) {
        if (node.id === "ChildrenArray") {
            node.children.push(items);
        } else if (node.children) {
            node.children.forEach(child => findAndInject(child));
        }
    }

    // Clonar el JSON para no modificar el original
    const clonedJson = JSON.parse(JSON.stringify(json));
    findAndInject(clonedJson);
    //console.log(clonedJson);
    return clonedJson;
}