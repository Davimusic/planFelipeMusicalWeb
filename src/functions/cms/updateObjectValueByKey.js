import deepClone from "../general/deepClone";

export default function updateObjectValueByKey(key, newValue, component, bodyTest, udpateBodies, setIsReinjected, setBody, setBodyEdit, setBodyTest, targetId) {
    console.log(key);
    console.log(newValue);
    console.log(component);
    console.log(bodyTest);
    console.log(targetId);
    

    function update(obj) {
        if (obj.id === targetId) {
            if (obj[key] !== undefined) {
                obj[key] = newValue;
            }
        } else if (obj.children) {
            obj.children = obj.children.map(child => update(child));
        }
        return obj;
    }

    let editObj = update(deepClone(component))
    let testObj = update(deepClone(bodyTest))
    //udpateBodies(editObj, testObj, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    setBody(testObj)
}