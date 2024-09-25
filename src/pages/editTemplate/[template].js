
import RenderElement from "@/functions/renderElement";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import React, { useState, useEffect, useRef } from 'react';
import { Menu } from "@/components/menu";
'../../estilos/general/general.css'
import ComponentRenderer from "@/components/complex/cms/ComponentRenderer";

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
                "className": ['rotate'],
            },
            {
                type: 'Text',
                id: 'ex3',
                text: 'Item 2',
                "className": [],
                style: { backgroundColor: 'green', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Text',
                id: 'ex4',
                text: 'Item 3',
                "className": [],
                style: { backgroundColor: 'blue', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' },
                onClick: () => alert('si')
            },
            {
                type: 'Text',
                id: 'ex5',
                text: 'Item 4',
                "className": [],
                style: { backgroundColor: 'yellow', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Text',
                id: 'ex6',
                text: 'Texto de ejemplo',
                "className": [],
                style: { backgroundColor: 'lightgrey', height: '45vh', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Image',
                id: 'ex7',
                "className": [],
                src: 'https://res.cloudinary.com/dplncudbq/image/upload/v1657563380/mias/h19_wgstaq.jpg',
                alt: 'Placeholder',
                width: '1000',
                height: '1000',
                style: { width: '100%', objectFit: 'cover', margin: '0 auto' }
            },
            {
                type: 'Video',
                id: 'ex8',
                "className": [],
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
    const [id, setId] = useState(0);//''


    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
        const style =  document.createElement('style');
            style.innerHTML =  `.frame {
                                    border: 3px solid blue;
                                }
                                `;
        document.head.appendChild(style);
    }, []);

    useEffect(() => {
        console.log(id);
    }, [id]);

    useEffect(() => {
        if (Object.keys(body).length !== 0) { 
            if (!isInjected) {
                console.log(body);
                setBody(injectLabelIntoJSON(body));
                setIsInjected(true);
            }
        }
    }, [body, isInjected]);

    function addFrameClass(obj, id) {
        function updateObject(obj, id) {
            if (obj.id === id) {
                setId(id)
                obj.className = obj.className || [];
                if (!obj.className.includes('frame')) {
                    obj.className.push('frame');
                }
            } else {
                if (obj.className && obj.className.includes('frame')) {
                    obj.className = obj.className.filter(className => className !== 'frame');
                }
            }
    
            if (obj.children && obj.children.length > 0) {
                obj.children = obj.children.map(child => updateObject(child, id));
            }
    
            return obj;
        }
    
        // Clonar el objeto antes de modificarlo
        const clonedObj = JSON.parse(JSON.stringify(obj));
        const updatedObj = updateObject(clonedObj, id);
        setBody(updatedObj);
    }

    const renderComponentNames = (component) => {
        const { type, id, children } = component;
        let depth = 0
        
        return (
            <div style={{ marginLeft: depth * 2, paddingLeft: '5px', marginTop: '10px'}} onClick={(e) => {
                e.stopPropagation();
                {addFrameClass(body, id)}
            }}>
                {type}
                {children && children.map((child, index) => (
                    <div key={index}>
                        {renderComponentNames(child, depth + 1)}
                    </div>
                ))}
            </div>
        );
    };

    const renderComponentAttributes = (component, targetId, depth = 0) => {
        const { type, id, className, style, children } = component;
    
        // Si el id del componente actual coincide con el targetId, comenzamos a renderizar
        if (id === targetId || depth > 0) {
            return (
                <div 
                    style={{ marginLeft: depth * 20, paddingLeft: '5px', marginTop: '10px' }} 
                    onClick={(e) => {
                        e.stopPropagation();
                        addFrameClass(body, id);
                    }}
                >
                    <div>
                        <strong>Type:</strong> {type}
                    </div>
                    <div>
                        <strong>ID:</strong> {id}
                    </div>
                    {className && (
                        <div>
                            <strong>ClassName:</strong> {className.join(', ')}
                        </div>
                    )}
                    {style && (
                        <div>
                            <strong>Style:</strong> {JSON.stringify(style)}
                        </div>
                    )}
                    {children && children.map((child, index) => (
                        <React.Fragment key={index}>
                            {renderComponentAttributes(child, targetId, depth + 1)}
                        </React.Fragment>
                    ))}
                </div>
            );
        }
    
        // Si no hemos encontrado el targetId, seguimos buscando en los hijos
        return children && children.map((child, index) => (
            <React.Fragment key={index}>
                {renderComponentAttributes(child, targetId, depth)}
            </React.Fragment>
        ));
    };
    
    

    return (
            <div className='center' style={{width: '100vw', height: '100vh', background: 'gray'}}>
                <div className='scroll' style={{width: '20%',  minWidth: '200px', maxWidth: '400px', height: '90%', background: 'green', padding: '20px'}}>
                    {renderComponentNames(body)}
                </div>
                <div className='' style={{width: '55%', height: '90%', background: 'red', position: 'relative'}}>
                    <Menu>
                        {RenderElement(body)}
                    </Menu>
                </div>
                <div className='scroll' style={{width: '20%',  minWidth: '200px', maxWidth: '400px', height: '90%', background: 'green', padding: '20px'}}>
                    <ComponentRenderer component={body} targetId={id} addFrameClass={()=> addFrameClass(body, id)} setBody={(value)=> setBody(value)}/>
                </div>
            </div>        
    )  
}