export default function convertStringFunctionsToOperables(path, functions, setBody) {
    if (typeof window !== 'undefined') {
        const storedObject = JSON.parse(localStorage.getItem(path));
        
        if (storedObject) {
            const traverseAndEval = (obj) => {
                if (obj.onClick) {
                    obj.onClick = eval(`(${obj.onClick})`);
                }
                if (obj.children && Array.isArray(obj.children)) {
                    obj.children.forEach(child => traverseAndEval(child));
                }
            };

            traverseAndEval(storedObject);
            setBody(storedObject);
        }
    }
}

