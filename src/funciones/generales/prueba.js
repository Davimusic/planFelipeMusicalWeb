import { useState, useEffect } from "react";
export default function Prueva(method, key, expectedValue){
    const [obj, setObj] = useState({})

    if(method === 'Post'){
        obj[key]=expectedValue
        setObj(obj)
        return obj
    } else if(method === 'Get'){
        return obj
    }
    //return obj
}