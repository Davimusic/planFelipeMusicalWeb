import React, { useState, useEffect } from 'react';
import importAllFunctions from '@/functions/general/importAllLocalFunctions';

const functions = importAllFunctions()
const ComponentRenderer = ({ component, targetId, addFrameClass, setBody }) => {
    const [classes, setClasses] = useState({});

    useEffect(() => {
        if(Object.keys(classes).length != 0){
            console.log(JSON.stringify(updateComponentClasses(component, classes), null, 2));
            let storedObject = JSON.stringify(updateComponentClasses(component, classes), null, 2)
            if (storedObject) {
                const traverseAndEval = (obj) => {
                    if (obj.onClick) {
                        obj.onClick = eval(`(${obj.onClick})`);
                    }
                    if (obj.onValueChange) {
                        obj.onValueChange = eval(`(${obj.onValueChange})`);
                    }
                    if (obj.children && Array.isArray(obj.children)) {
                        obj.children.forEach(child => traverseAndEval(child));
                    }
                };
    
                traverseAndEval(storedObject);
                console.log(storedObject);
                
                setBody(storedObject);
            }
        }
    }, [classes]);

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
        if (classes[component.id]) {
            component.className = classes[component.id];
        }
        if (component.children) {
            component.children = component.children.map(child => updateComponentClasses(child, classes));
        }
        return component;
    };

    const renderComponentAttributes = (component, depth = 0) => {
        const { type, id, style, children } = component;
        const componentClasses = classes[id] || component.className || [];

        if (id === targetId || depth > 0) {
            return (
                <div 
                    style={{ marginLeft: depth * 20, paddingLeft: '5px', marginTop: '10px' }} 
                    onClick={(e) => {
                        e.stopPropagation();
                        addFrameClass(component, targetId);
                    }}
                >
                    <div>
                        <strong>Type:</strong> {type}
                    </div>
                    <div>
                        <strong>ID:</strong> {id}
                    </div>
                    <div>
                        <strong>ClassName:</strong> 
                        {componentClasses.map((cls, index) => (
                            <span key={index} style={{ margin: '0 5px', display: 'inline-block', background: '#e0e0e0', padding: '2px 5px', borderRadius: '3px' }}>
                                {cls} 
                                <button onClick={() => handleRemoveClass(id, cls)} style={{ marginLeft: '5px' }}>x</button>
                            </span>
                        ))}
                        <input 
                            type="text" 
                            placeholder="Add class" 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddClass(id, e.target.value);
                                    e.target.value = '';
                                }
                            }} 
                            style={{ marginLeft: '10px' }}
                        />
                    </div>
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

