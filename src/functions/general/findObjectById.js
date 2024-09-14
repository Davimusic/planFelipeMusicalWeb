export default function findObjectById(obj, id) {
    if (obj.id === id) {
        return obj;
    }

    if (obj.children && obj.children.length > 0) {
        for (let child of obj.children) {
            const result = findObjectById(child, id);
            if (result) {
                return result;
            }
        }
    }

    return null;
}