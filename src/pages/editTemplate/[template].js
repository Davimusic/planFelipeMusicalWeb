import localStorageAcces from "@/functions/security/localStorageAcces"
import RenderElement from "@/functions/renderElement";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import React, { useState, useEffect, useRef } from 'react';
import { Menu } from "@/components/menu";
'../../estilos/general/general.css'
import renderComponentNames from "@/functions/cms/renderComponentNames";

const functions = importAllFunctions()

const items= 
    {
        type: 'Container',
        id: 'ex1',
        style: {display: 'flex'},
        className: ['scroll'],
        children: [
            {
                type: 'Text',
                id: 'ex2',
                text: 'Item 1',
                style: { backgroundColor: 'red', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' },
                className: 'rotate'
            },
            {
                type: 'Text',
                id: 'ex3',
                text: 'Item 2',
                style: { backgroundColor: 'green', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Text',
                id: 'ex4',
                text: 'Item 3',
                style: { backgroundColor: 'blue', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' },
                onClick: () => alert('si')
            },
            {
                type: 'Text',
                id: 'ex5',
                text: 'Item 4',
                style: { backgroundColor: 'yellow', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Text',
                id: 'ex6',
                text: 'Texto de ejemplo',
                style: { backgroundColor: 'lightgrey', height: '45vh', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Image',
                id: 'ex7',
                src: 'https://res.cloudinary.com/dplncudbq/image/upload/v1657563380/mias/h19_wgstaq.jpg',
                alt: 'Placeholder',
                width: '1000',
                height: '1000',
                style: { width: '100%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Video',
                id: 'ex8',
                src: 'https://res.cloudinary.com/dplncudbq/video/upload/v1657988838/mias/y5_hjj0uv.mp4',
                style: { height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' }
            }
        ]
}
function injectLabelIntoJSON(json) {
    console.log(json);
    
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
    return clonedJson;
}


export default function hi(){
    const [body, setBody] = useState({});
    const [isInjected, setIsInjected] = useState(false);

    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
    }, []);

    useEffect(() => {
        if (Object.keys(body).length !== 0) { 
            if (!isInjected) {
                console.log(body);
                setBody(injectLabelIntoJSON(body));
                setIsInjected(true);
            }
            const element = document.getElementById('1');
                if (element) {
                    console.log('este');
                    console.log(element.style);  
                }
        }
    }, [body, isInjected]);

    useEffect(() => {
        console.log(body);
    }, [body]);

    return (
                    <div className='center' style={{width: '100vw', height: '100vh', background: 'gray'}}>
                            <div className='scroll' style={{width: '20%',  minWidth: '200px', maxWidth: '400px', height: '90%', background: 'green'}}>
                                {renderComponentNames(body)}
                            </div>
                            <div className='' style={{width: '55%', height: '90%', background: 'red'}}>
                                <Menu>
                                    {RenderElement(body)}
                                </Menu>
                            </div>
                            <div className='' style={{width: '20%',  minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gold'}}>
                                acponente en edicion
                            </div>
                    </div>
    )  
                    
}