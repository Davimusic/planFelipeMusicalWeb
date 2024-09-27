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
                onClick: `() => alert('si')`
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
    const [selectedId, setSelectedId] = useState(null);
    
    const handleButtonClick = (id) => {
        setSelectedId(id);
        addFrameClass(body, id);
    };

    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
        const style =  document.createElement('style');
            style.innerHTML =  `.frame {
                                    border: 5px solid blue;
                                }
                                `;
        document.head.appendChild(style);
    }, []);

    useEffect(() => {
        
        //console.log(body);
    }, [body]);

    useEffect(() => {
        if (Object.keys(body).length !== 0) { 
            if (!isInjected) {
                console.log(body);
                //setBody(injectLabelIntoJSON(body));
                setIsInjected(true);
                setBody(traverseAndReplaceOnClick(injectLabelIntoJSON(body)))
            }
        }
    }, [body, isInjected]);

    function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    
    
    function traverseAndReplaceOnClick(obj) {
        if (obj !== undefined && !isEmptyObject(obj)) {
            //console.log(obj);
    
            obj.onClick = (event) => {
                event.stopPropagation(); // Evita la propagación del evento
                console.log('hola ' + obj.type + ', id: ' + obj.id);
                setSelectedId(obj.id);
                setId(obj.id)
            };
            
    
            if (obj.children && Array.isArray(obj.children)) {
                obj.children.forEach(child => traverseAndReplaceOnClick(child));
            }
        }
        console.log(JSON.stringify(obj, null, 2));

        return obj;
    }

    function addFrameClass(obj, id) {
        function updateObject(obj, id) {
            if (obj.id === id) {
                setId(id);
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
    
        // Función de clonación profunda que mantiene las funciones
        function deepClone(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
    
            if (Array.isArray(obj)) {
                return obj.map(item => deepClone(item));
            }
    
            const clonedObj = { ...obj };
            for (const key in clonedObj) {
                clonedObj[key] = deepClone(clonedObj[key]);
            }
    
            return clonedObj;
        }
    
        const clonedObj = deepClone(obj);
        const updatedObj = updateObject(clonedObj, id);
        setBody(updatedObj);
    }
    

    const renderComponentNames = (component) => {
        const { type, id, children } = component;
        let depth = 0;
    
        return (
            <div style={{ marginLeft: depth * 2, paddingLeft: '5px'}}>
                <div
                    className={selectedId === id ? 'color2 borders1' : ''}
                    style={{padding: '10px'}}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(id);
                        handleButtonClick(id);
                    }}
                >
                    {type}
                </div>
                {children && children.map((child, index) => (
                    <div key={index}>
                        {renderComponentNames(child)}
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
        <div className='center' style={{width: '100vw', height: '100vh', background: 'black'}}>
        <div className='scroll borders1' style={{width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black'}}>
            {renderComponentNames(body)}
        </div>
        <div className='' style={{width: '55%', height: '90%', background: 'transparent', position: 'relative', border: '1px solid black'}}>
            <Menu>
                {RenderElement(body)}
            </Menu>
        </div>
        <div className='scroll borders1' style={{width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black'}}>
            <ComponentRenderer component={body} targetId={id} addFrameClass={() => addFrameClass(body, id)} setBody={(value) => setBody(value)} />
        </div>
    </div>
        
    )  
}