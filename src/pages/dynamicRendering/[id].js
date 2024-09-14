import '../../estilos/general/general.css'
import { Menu } from '@/components/menu';
import React, { useState, useEffect } from "react";
import RenderElement from '@/functions/renderElement';
import importAllLocalFunctions from '@/functions/general/importAllLocalFunctions';

const functions = importAllLocalFunctions()
export default function render() {
    const [body, setBody] = useState({});

    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
    }, []);

    return <Menu>{RenderElement(body)}</Menu>
}



