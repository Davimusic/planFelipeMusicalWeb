// traverseAndReplaceOnClick.js
import isEmptyObject from "@/functions/general/isEmptyObject";

export default function traverseAndReplaceOnClick(obj, handleButtonClick) {
    if (obj !== undefined && !isEmptyObject(obj)) {
        obj.onClick = (e) => {
            e.stopPropagation();
            handleButtonClick(obj.id);
        };

        if (obj.children && Array.isArray(obj.children)) {
            obj.children.forEach(child => traverseAndReplaceOnClick(child, handleButtonClick));
        }
    }
    return obj;
}
