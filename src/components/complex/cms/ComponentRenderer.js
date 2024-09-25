import React, { useState, useEffect } from 'react';
import importAllFunctions from '@/functions/general/importAllLocalFunctions';
import '../../../estilos/general/general.css'
import Input from '@/components/simple/input';

const functions = importAllFunctions()

const ComponentRendere = ({ component, targetId, addFrameClass }) => {
    const renderComponentAttributes = (component, depth = 0) => {
        const { type, id, style, children, className, ...otherProps } = component;
        const componentClasses = Array.isArray(className) ? [...new Set(className)] : [];

        const specialAttributes = ['src', 'alt', 'href', 'title']; // Lista de atributos especiales

        // Render the component if it matches the targetId or if it's a child of the target component
        if (id === targetId || depth > 0) {
            return (
                <div 
                    key={id} // Asegúrate de que el key sea único
                    style={{ 
                        marginLeft: depth * 20, 
                        paddingLeft: '5px', 
                        marginTop: '10px', 
                        display: 'flex', 
                        flexDirection: 'column' 
                    }} 
                    onClick={(e) => {
                        e.stopPropagation();
                        addFrameClass(component, targetId);
                    }}
                >
                    <button 
                        style={{ marginTop: '10px', background: 'red', color: 'white', marginTop: depth !== 0 ? '50px' : '' }}
                    >
                        Delete
                    </button>
                    <div>
                        <strong>Type:</strong> {type}
                    </div>
                    <div>
                        <strong>ID:</strong> {id}
                    </div>
                    {componentClasses.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <strong>ClassName:</strong> 
                            {componentClasses.map((cls, index) => (
                                <span key={index} style={{ margin: '0 5px', display: 'inline-block', background: 'black', padding: '2px 5px', borderRadius: '3px' }}>
                                    {cls}
                                </span>
                            ))}
                        </div>
                    )}
                    {style && (
                        <div>
                            <strong>Style:</strong> 
                            {Object.entries(style).map(([key, value], index) => (
                                <div key={index} style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{key}:</span>
                                    <input 
                                        type="text" 
                                        value={value} 
                                        readOnly
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {Object.keys(otherProps).map((key, index) => (
                        specialAttributes.includes(key) ? (
                            <div key={index} style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{key}:</span>
                                <input 
                                    type="text" 
                                    value={otherProps[key]} 
                                    readOnly
                                    style={{ flex: 1 }}
                                />
                            </div>
                        ) : null
                    ))}
                    {children && children.map((child, index) => (
                        <React.Fragment key={index}>
                            {renderComponentAttributes(child, depth + 1)}
                        </React.Fragment>
                    ))}
                </div>
            );
        }

        // If the component does not match the targetId and is not a child, return null
        return null;
    };

    return renderComponentAttributes(component);
};

function traverseAndFilter(node, targetId) {
    if (node.id === targetId) {
        return node;
    }
    if (node.children) {
        for (let child of node.children) {
            const result = traverseAndFilter(child, targetId);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

const formatNode = (node) => {
    if (!node) return null;

    return (
        <div key={node.id} style={{}}>
            <div>Type: {node.type}</div>
            <button className='borders1' style={{marginRight: '10px', background: 'green', padding: '10px', fontSize: '100%'}}>
                Save changes
            </button>
            {/*<div>ID: {node.id}</div>*/}
            <div>onClick: {node.onClick ? <Input className={['borders1']} type={"text"} value={node.onClick.toString()} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/> : <Input className={['borders1']} type={"text"} value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>}</div>
            {node.className && (
                <div style={{display: 'block', background: 'gold'}} className='borders1'>
                    ClassName:
                    {node.className.map((className, index) => (
                        <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}} key={index}>
                            {className} <button className='borders1' onClick={() => console.log(className + ' borrar')} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                        </div>
                    ))}
                </div>
            )}
            {node.style && (
                <div style={{background: 'gold'}}>
                    Style:
                    {Object.entries(node.style).map(([key, value], index) => (
                        <div key={index} style={{display: 'block', background: 'blue'}} className='borders1'>
                            <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}}>
                                {key}   <button className='borders1' onClick={() => console.log(key + ' borrar')} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                            </div>
                            <Input className={['borders1']} type={"text"} value={value} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>
                        </div>
                    ))}
                </div>
            )}
            <button className='borders1' style={{marginRight: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                Delete
            </button>
            {node.type !== 'Container' && node.children && node.children.map(child => formatNode(child))}
        </div>
    );
};





const ComponentRenderer = ({ component, targetId }) => {
    const filteredComponent = traverseAndFilter(component, targetId);
    return (
        <div>
            {formatNode(filteredComponent)}
        </div>
    );
};


export default ComponentRenderer;







/**
 import React, { useState, useEffect } from 'react';
import importAllFunctions from '@/functions/general/importAllLocalFunctions';

const functions = importAllFunctions()



const ComponentRenderer = ({ component, targetId, addFrameClass, setBody }) => {
    const [classes, setClasses] = useState({});
    const [availableClasses, setAvailableClasses] = useState(['class1', 'class2', 'class3', 'rotate']); // Lista de clases disponibles
    const [selectedClass, setSelectedClass] = useState(''); // Clase seleccionada en el select

    useEffect(() => {
        if (Object.keys(classes).length !== 0) {
            setBody(JSON.parse(JSON.stringify(updateComponentClasses(component, classes), null, 2)));
        }
    }, [classes]);

    useEffect(() => {
        console.log(component);
    }, [component]);

    const handleRemoveClass = (id, classToRemove) => {
        setClasses(prevClasses => ({
            ...prevClasses,
            [id]: prevClasses[id].filter(cls => cls !== classToRemove)
        }));
    };

    const handleAddClass = (id, newClass) => {
        if (newClass && (!classes[id] || !classes[id].includes(newClass))) {
            setClasses(prevClasses => ({
                ...prevClasses,
                [id]: [...(prevClasses[id] || []), newClass]
            }));
        }
    };

    const updateComponentClasses = (component, classes) => {
        const existingClasses = Array.isArray(component.className) ? component.className : [];
        const newClasses = classes[component.id] || [];
        component.className = [...new Set([...existingClasses, ...newClasses])];

        if (component.children) {
            component.children = component.children.map(child => updateComponentClasses(child, classes));
        }
        return component;
    };

    const removeComponentAndChildren = (component, idToRemove) => {
        if (component.id === idToRemove) {
            return null;
        }

        if (component.children) {
            component.children = component.children
                .map(child => removeComponentAndChildren(child, idToRemove))
                .filter(child => child !== null);
        }

        return component;
    };

    const handleRemoveComponent = (idToRemove) => {
        const updatedComponent = removeComponentAndChildren(component, idToRemove);
        setBody(JSON.parse(JSON.stringify(updatedComponent, null, 2)));
    };

    const renderComponentAttributes = (component, depth = 0) => {
        const { type, id, style, children } = component;
        const componentClasses = classes[id] || (Array.isArray(component.className) ? component.className : []);

        if (id === targetId || depth > 0) {
            return (
                <div 
                    key={id} // Asegúrate de que el key sea único
                    style={{ 
                        marginLeft: depth * 20, 
                        paddingLeft: '5px', 
                        marginTop: '10px', 
                        display: 'flex', 
                        flexDirection: 'column' 
                    }} 
                    onClick={(e) => {
                        e.stopPropagation();
                        addFrameClass(component, targetId);
                    }}
                >
                    <div style={{ paddingTop: depth === 0 ? '50px' : '' }}>
                        <strong>Type:</strong> {type}
                    </div>
                    <div>
                        <strong>ID:</strong> {id}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <strong>ClassName:</strong> 
                        {componentClasses.map((cls, index) => (
                            <span key={index} style={{ margin: '0 5px', display: 'inline-block', background: 'black', padding: '2px 5px', borderRadius: '3px' }}>
                                {cls} 
                                <button onClick={() => handleRemoveClass(id, cls)} style={{ marginLeft: '5px' }}>x</button>
                            </span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <select 
                            value={selectedClass} 
                            onChange={(e) => setSelectedClass(e.target.value)} 
                            style={{ marginRight: '10px', background: 'black', color: 'white', fontSize: '1em' }}
                        >
                            <option value="">Select class</option>
                            {availableClasses.map((cls, index) => (
                                <option key={index} value={cls}>{cls}</option>
                            ))}
                        </select>
                        <button style={{background: 'black', color: 'white', fontSize: '1em'}} 
                            onClick={() => {
                                handleAddClass(id, selectedClass);
                                setSelectedClass('');
                            }} 
                        >
                            Add Class
                        </button>
                    </div>
                    <button onClick={() => handleRemoveComponent(id)} style={{ marginTop: '10px', background: 'red', color: 'white' }}>Remove Component</button>
                    {style && (
                        <div>
                            <strong>Style:</strong> {JSON.stringify(style)}
                        </div>
                    )}
                    {children && children.map((child, index) => (
                        <React.Fragment key={index}>
                            {renderComponentAttributes(child, depth + 1)}
                        </React.Fragment>
                    ))}
                </div>
            );
        }

        return children && children.map((child, index) => (
            <React.Fragment key={index}>
                {renderComponentAttributes(child, depth)}
            </React.Fragment>
        ));
    };

    return renderComponentAttributes(component);
};

export default ComponentRenderer;
 */