import Input from "@/components/simple/input";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import findObjectById from "@/functions/general/findObjectById";
import React from 'react';
import TextArea from "@/components/simple/textArea";


let functions = importAllFunctions()




const componentRendererAttributes = (component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected) => {
    //console.log(classNames);
    
    const filteredComponent = traverseAndFilter(component, targetId);
    return (
        <div>
            {formatNode(filteredComponent, component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected)}
        </div>
    );
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

const formatNode = (node, component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected) => {

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    const removeClass = (classToRemove) => {
        const newArray = functions.removeStringFromArray(findObjectById(component, targetId).className, classToRemove)
        setClassNames(newArray)
        setBody(functions.updateObjectKeyById(targetId, component, 'className', newArray))
    };

    const addClass = () => {
        const newArray = functions.addElementToArray(classNames, selectedClassName)
        setClassNames(newArray)
        setBody(functions.updateObjectKeyById(targetId, component, 'className', newArray))
    }

    const setNewClass = (newClass) => {
        setSelectedClassName(newClass)
    }

    function deleteComponent() {
        const id = targetId;
        const obj = component
        // Función para clonar el objeto
        function clone(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    
        function removeComponentById(id, obj) {
            if (obj.id === id) {
                return null;
            }
            if (obj.children) {
                obj.children = obj.children
                    .map(child => removeComponentById(id, child))
                    .filter(child => child !== null);
            }
            return obj;
        }
    
        const clonedObj = clone(obj);
    
        console.log(removeComponentById(id, clonedObj));
        setIsReinjected(true)
        setBody(removeComponentById(id, clonedObj))
    }

    function deleteStyle(styleKey) {
        const obj = component
        // Función para clonar el objeto
        function clone(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    
        // Función recursiva para eliminar el estilo
        function removeStyleById(styleKey, targetId, obj) {
            if (obj.id === targetId && obj.style) {
                delete obj.style[styleKey];
            }
            if (obj.children) {
                obj.children = obj.children.map(child => removeStyleById(styleKey, targetId, child));
            }
            return obj;
        }
    
        // Clonar el objeto original
        const clonedObj = clone(obj);
        setIsReinjected(true)
        console.log(removeStyleById(styleKey, targetId, clonedObj));
        setBody(removeStyleById(styleKey, targetId, clonedObj))
    }

    function injectStyle() {
        // Obtener el nuevo estilo del input
        const newKeyValue = document.getElementById('styleInput').value;
    
        
        
    
        // Función recursiva para agregar el nuevo estilo
        function addStyleById(newKeyValue, targetId, obj) {
            if (obj.id === targetId) {
                const [key, value] = newKeyValue.split(':');
                if (obj.style) {
                    obj.style[key.trim()] = value.trim();
                } else {
                    obj.style = { [key.trim()]: value.trim() };
                }
            }
            if (obj.children) {
                obj.children = obj.children.map(child => addStyleById(newKeyValue, targetId, child));
            }
            return obj;
        }
    
        // Clonar el objeto original
        const clonedObj = clone(component);
        setIsReinjected(true)
        console.log(addStyleById(newKeyValue, targetId, clonedObj));
        setBody(addStyleById(newKeyValue, targetId, clonedObj))
    }

    const setStyleInputValue = (key, value) => {
        document.getElementById('styleInput').value = `${key}: ${value}`
    }

    function changeText(newText) {
        console.log(newText);
        
    
        function updateText(obj) {
            if (obj.id === targetId) {
                if (obj.type === 'Text' || obj.type === 'Link') {
                    obj.text = newText;
                } else if (obj.type === 'TextArea' || obj.type === 'Label' || obj.type === 'Input') {
                    obj.value = newText;
                }
            } else if (obj.children) {
                obj.children = obj.children.map(child => updateText(child));
            }
            return obj;
        }
    
        const obj = clone(component);
        const updatedObj = updateText(obj);
        console.log(updatedObj);
        setIsReinjected(true)
        setBody(updatedObj)
    }

    function updateValueByKey(key, newValue) {
        console.log(targetId);
        console.log(key);
        console.log(newValue);
        
        
        
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
    
        const clonedComponent = clone(component);
        const updatedComponent = update(clonedComponent);
        console.log(updatedComponent);
        
        setIsReinjected(true)
        setBody(updatedComponent)
    }

    if (!node) return null;

    return (
        <div key={node.id} style={{}}>
            <div>Type: {node.type}</div>
            <div className="marginTop1">onClick: {node.onClick ? <Input className={['borders1', 'cursor']} type="text" value={node.onClick.toString()} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/> : <Input className={['borders1']} type="text" value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>}</div>
            {node.className && (
                <div style={{display: 'block', background: 'gold'}} className='borders1 padding1 marginTop1'>
                    ClassName:
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <select value={selectedClassName} onChange={(e) => setSelectedClassName(e.target.value)} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}>
                            <option value="">Select class</option>
                            {availableClasses.map((cls, index) => (
                                <option key={index} value={cls}>{cls}</option>
                            ))}
                        </select>
                        <button className='borders1 cursor' onClick={()=> addClass()} style={{marginRight: '10px', background: 'blue', padding: '10px', fontSize: '100%'}}>
                            Add class
                        </button>
                    </div>
                    {node.className.map((className, index) => (
                        <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}} key={index}>
                            {className} <button className='borders1 cursor' onClick={() => removeClass(className)} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                        </div>
                    ))}
                </div>
            )}
            {node.style && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Style:
                    <Input id={'styleInput'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => console.log(e)} type="text" value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                    <button className='borders1 cursor' onClick={() => injectStyle()} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                        add new style
                    </button>
                    {Object.entries(node.style).map(([key, value], index) => (
                        <div onClick={()=> setStyleInputValue(key, value)} key={index} style={{display: 'block', background: 'blue', margin: '10px'}} className='borders1'>
                            <div className='borders1 center' style={{background: 'black', padding: '10px', display: 'flex'}}>
                                {key}   
                                <button className='borders1 cursor' onClick={() => deleteStyle(key)} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                    x
                                </button>
                            </div>
                            <p className='center'>{value}</p>
                        </div>
                    ))}
                </div>
            )}
            {node.text && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Text:
                    <Input id={'styleInput'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => changeText(e)} type="text" value={node.text} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                    <button className='borders1 cursor' onClick={() => injectStyle()} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                        add new style
                    </button>
                </div>
            )}
            {node.value && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Value:
                    <TextArea id={'styleTextArea'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => changeText(e)} type="text" value={node.value} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                </div>
            )}
            {node.src && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    src:
                    <Input className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => updateValueByKey('src', e)} type="text" value={node.src} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                </div>
            )}
            <button className='borders1 cursor marginTop1' onClick={()=> deleteComponent()} style={{marginRight: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                Delete component
            </button>
        </div>
    );
};

export default componentRendererAttributes